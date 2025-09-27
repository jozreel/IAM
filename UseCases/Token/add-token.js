const RefreshToken  = require('./refresh-token');
const { CLIENT_CREDENTIALS, PKCE, AUTHORIZATION_CODE, REFRESH_TOKEN } = require('../../Entities/Application/cred-type');
const make_token =  require('../../Entities/Token');
const { authorize_helpers } = require('../Helpers');
const make_login =  require('../../Entities/Login');



const AddToken = ({token_db, app_db , user_db, login_db, get_creds, generate_token, createUtcDate, verify_string, verify_token, decode_token}) => {
    return async(req) => {
        try {
             let offlineaccess =  false;
             console.log(req.data);
             const {client_id, loginid, cred_type, grant_type, code_verifier, code, offline_access} =  req.data;
           
             if(grant_type === REFRESH_TOKEN) {
                const rt = RefreshToken({
                    tokendb: token_db,
                    app_db,
                    createUTCDate: createUtcDate,
                    decode_token,
                    generate_token,
                    get_creds,
                    userdb: user_db,
                    verify_token
                })
                return await rt(req);
            }
           
          

            const app =  await app_db.get_application(client_id);

            if(!app) {
                throw new Error('Token generation error. Application not found');
            }
            
            const id_expire =  Math.floor((Date.now() / 1000) + (60 * 5));
            const access_expire =  Math.floor((Date.now() / 1000) + (60 * 30));
            
            const refresh_expire = Math.floor((Date.now() / 1000)) + 31560000; 
            const accesstokendata = {
                iat: Math.floor(Date.now() / 1000),
                exp: access_expire
               }; 
            const refreshtokendata = {
                  iat: Math.floor(Date.now() / 1000),
                  exp: refresh_expire,
             };
            const id_token_data = {
                iat: Math.floor(Date.now() / 1000),
                exp: id_expire,
             };



             //authorization code flow 
            
            if(grant_type === AUTHORIZATION_CODE){
                const login_obj = await login_db.get_login(loginid);
                if(!login_obj) {
                  throw new Error("No login found for this user")
                }

                const login =  login_obj.ToJson();
                if(login.codeused) {
                    throw new Error('Invalid request code used')
                }

                const userid =  login.uid;
                const user_obj =  await user_db.get_user(userid);
            
                
                if(!user_obj) {
                    throw new Error('Authentication error');
                }
                const user =  user_obj.ToJson();
                  const nonce =  login.nonce;
                  if(nonce) {
                    id_token_data.nonce = nonce;
                  }

                  if(login.offlineaccess) {
                    offlineaccess =  true;
                  }

                const stored_code =  login.code;

                 accesstokendata.roles = user.roles;
                 accesstokendata.sub = user.id.toString();
                 refreshtokendata.sub = user.id.toString();
                 refreshtokendata.session =  login.id;

                 accesstokendata.accounttype =  'user'
                 refreshtokendata.accounttype = 'user'
                 id_token_data.sub = user.id.toString();
                 id_token_data.session =  login.id;
    
                if(stored_code !== code) {
                    throw new Error('Invalid code exchange');
                }
            
                const utcnow =  createUtcDate();
                const utccreated =  createUtcDate(login.codecreationtime);
                if(utccreated.valueOf() + (60 * 5) > utcnow) {
                    throw new Error('Code expired');
                }
                if(req.credentials) {
                    const basic_creds =  get_creds(req.credentials);
            
            

            
        
                //check if crewds are valid
              
                    const clientid =  app.getId();
                    const secret =  app.getClientSecret();
                
                    //const verified = await verify_string(basic_creds?.password, adminPassword); 
                    
                    if(basic_creds && (basic_creds.username !== clientid || basic_creds.password !== secret)) {
                        throw new Error('Invalid client credentials');
                    }
                }
        }


        //client credentials code flow
        console.log(grant_type, CLIENT_CREDENTIALS)

        if(grant_type === CLIENT_CREDENTIALS) {
            if(offline_access) {
                offlineaccess =  true;
            }
            if(!req.credentials) {
                throw new Error('Invalod credentials')
            }
            const basic_creds =  get_creds(req.credentials);
            const clientid =  app.getId();
            const secret =  app.getClientSecret();
            
        
            //const verified = await verify_string(basic_creds?.password, adminPassword); 
            
            if(basic_creds && (basic_creds.username !== clientid || basic_creds.password !== secret)) {
                throw new Error('Invalid client credentials');
            }
            accesstokendata.roles =  app.getServiceAccountRoles(),
            accesstokendata.sub =  app.getId();
            refreshtokendata.sub =  app.getId();
            accesstokendata.accounttype =  'serviceaccount'
            refreshtokendata.accounttype = 'serviceaccount'
            id_token_data.sub = app.getId();
            
           
         }
        
        if(grant_type !== CLIENT_CREDENTIALS && (grant_type === PKCE || grant_type == code_verifier)) {
            // validate the code challenge
            const code_challenge =  login.codechallenge;
            const code_challenge_method =  login.codechallengemethod;
            if(!codechallenge || !authorize_helpers.VerifyPkce(code_verifier, code_challenge, code_challenge_method)) {
                throw new Error('Authentication error');
            }
        }

      
       
       
      
        const id_token =  generate_token(id_token_data);

        const access_token  =  generate_token(accesstokendata);

        let refresh_token;
        const cookies = [];
        if(offlineaccess) {
            refresh_token  =  generate_token(refreshtokendata);
          
            //possibly add condition for client eds workflow
            if(grant_type === AUTHORIZATION_CODE) {
                  const tk =  make_token({
                    id: crypto.randomUUID(),
                    loginid,
                    token: refresh_token,
                    validuntil: refresh_expire
                 });
                await token_db.AddToken({
                        id: tk.GetId(),
                        token: tk.GetToken(),
                        validuntil: tk.GetValidUntil(),
                        loginid: tk.GetLoginId(),
                        createddate: tk.GetCreatedDate(),
                        lastmodifieddate: tk.GetLastModifiedDate()
                });
                
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
        } else {

            const mlid =  crypto.randomUUID();
            const logindata = {
                id: mlid,
                uid: app.getId(),
                appid: app.getId(),
                code: 'NONE'
            }
            if(offlineaccess) {
                logindata.token = make_token(
                    {
                        id: crypto.randomUUID(),
                        loginid: mlid,
                        token: refresh_token,
                        validuntil: refresh_expire
                    }
                )
                
               logindata.offlineaccess = offline_access ? JSON.parse(offline_access) : false
            }
            const app_login = make_login(logindata);
            

            await login_db.insert_login_with_token(
                {
                    _id: app_login.getId(),

                    appid: app_login.getAppID(),
                    token: app_login.getToken().ToJson(),
                    offlineaccess:app_login.getOfflineAcces()
                }
            )

        
        }
       }
       

       
       
        
        


        const resp =  {
            data: {
            id: {token: id_token, valid_until: id_expire},
            access: {token: access_token, valid_until: access_expire},
            refresh: offlineaccess ? {token: refresh_token, valid_until: refresh_expire} : null
            },
            cookies
        };

        return resp;

            


        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports = AddToken