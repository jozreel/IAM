const { REFRESH_TOKEN } = require('../../Entities/Application/cred-type');
const make_token = require('../../Entities/Token');
const crypto = require('crypto');
const{authorize_helpers} = require('../Helpers');
const refresh_token = ({tokendb,userdb, app_db, decode_token, verify_token, generate_token, createUTCDate, get_creds, hash_string, verify_string, login_db}) => {
     
    
    return async (req)=> {
        try {
          
            const basic_creds =  get_creds(req.credentials);

            if(req.data.grant_type !== REFRESH_TOKEN) {
                throw new Error('invalid grant type');
            }

            const clientid = basic_creds.username;
           
            const app =  await app_db.get_application(clientid);
            const rotatetokens =  app.getRefreshTokenRotation();

           
            
            if(!app) {
                throw new Error('Invalid client');
            }
            const secret =  app.getClientSecret();
            if(secret !== basic_creds.password) {
                throw new Error('Bad request');
            }
            
            //const verified = await verify_string(basic_creds?.password, adminPassword); 
            
            if(basic_creds && (basic_creds.username !== clientid || basic_creds.password !== secret)) {
                throw new Error('Invalid client credentials');
            }

            const id_expire =  Math.floor((Date.now() / 1000)) + (60 * 5);
            const access_expire = Math.floor((Date.now() / 1000)) + (60 * 30);

            const refresh_expire = Math.floor((Date.now() / 1000)) + (60 * 1440); 
            const loginid =  req.data.sessionid;
           
            
            //const ref_token = req.credentials;
            
            const session_token = req.cookies.refresh_session_cookie;
            const sessionid =  req.cookies.sessionid;
            const login = await login_db.get_login(sessionid);
        


          
            if(!session_token) {
                throw new Error('Invalid session');
            }
           
            const token =  await tokendb.GetTokenForSession(loginid);
             if(!token) {
                throw new Error('Invalid session');
            }
            if(!token.offlineaccess) {
                throw new Error("No offline access scope enabled");
            }
            const userid =  token.uid;
          
           
            const user_obj =  await userdb.get_user(userid);
            if(!user_obj) {
                throw new Error('user does not exist');
            }
            const user = user_obj.ToJson();

           

            if(await verify_string(session_token, token?.token?.token)) {
                // const token_data = verify_token(session_token);
              
                 //if(!token_data) {
                  //  throw new Error('Invalid session')
                // }
                 
                 const now =  createUTCDate();
                 if(now.valueOf() < token.token.valid_until) {
                    throw new Error('Session expired');
                 }
                  
                const id_token =  generate_token({
                   /* username: user.username,
                    email: user.email,
                    name: `${user.firstname} ${user.lastname}`,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    photo: user.photo,*/
                    iat: Math.floor(Date.now() / 1000),
                    exp: id_expire,
                    sub: user.id,
                    session: loginid,
                });

                const access_token  =  generate_token({
                    roles: user.roles,
                    iat: Math.floor(Date.now() / 1000),
                    exp: access_expire,
                    sub: user.id,
                    aud: clientid
                });


                const refresh_token = authorize_helpers.generate_refresh_token();
               /* const refresh_token  =  generate_token({
                    session: loginid,
                    iat: Math.floor(Date.now() / 1000),
                    exp: refresh_expire,
                    sub: user.id
                });*/

                const tk =  make_token({
                    id: crypto.randomUUID(),
                    token: await hash_string(refresh_token),
                    validuntil: refresh_expire,
                    loginid,
                });

                   await tokendb.AddToken({
                    id: tk.GetId(),
                    token: tk.GetToken(),
                    validuntil: tk.GetValidUntil(),
                    loginid: tk.GetLoginId(),
                    createddate: tk.GetCreatedDate(),
                    lastmodifieddate: tk.GetLastModifiedDate()

                });
                const cookies = [];
                const refresh_session_cookie = {
                    name: "refresh_session_cookie", 
                    value: refresh_token,
                    options: {
                        httpOnly: true, // This is the crucial part
                        secure: process.env.NODE_ENV === 'production', 
                        maxAge: refresh_expire * 1000,
                        sameSite: 'Lax', 
                        path: '/' 
                    }
                }

                    const refresh_exp_cookie = {
                    name: "refresh_expiry", 
                    value: refresh_expire,
                    options: {
                        httpOnly: true, // This is the crucial part
                        secure: process.env.NODE_ENV === 'production', 
                        maxAge: refresh_expire * 1000,
                        sameSite: 'Lax', 
                        path: '/' 
                    }
                }
                
                cookies.push(refresh_session_cookie);
                cookies.push(refresh_exp_cookie);
                return {
                    cookies,
                    data: {
                        session: loginid,
                        id: {
                            token: id_token,
                            valid_until: id_expire
                        },
                        refresh: rotatetokens ? {
                            token: refresh_token,
                            valid_until: refresh_expire
                        } : token?.token?.token,
                        access: {
                            token: access_token,
                            valid_until: access_expire,
                        }

                    }
                }
                
                 

            } else {
                throw new Error('Invalid token');
            }

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

}

module.exports =  refresh_token;