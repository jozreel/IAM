const make_token = require('../../Entities/Token');
const refresh_token = ({tokendb,userdb, decode_token, verify_token, generate_token, createUTCDate}) => {
    return async (req)=> {
        try {
            const id_expire =  (Date.now() / 1000) + (60 * 5);
            const access_expire =  (Date.now() / 1000) + (60 * 30);

            const refresh_expire = (Date.now() / 1000) + (60 * 1440); 
            const loginid =  req.sessionid;
            const userid =  req.userid;
            //const ref_token = req.credentials;
            const session_token = req.cookies.refresh_session;
            if(!session_token) {
                throw new Error('Invalid session');
            }
           
            const token =  await tokendb.GetTokenForSession(loginid);
            if(!token) {
                throw new Error('Invalid session');
            }
            const user =  await userdb.get_user(userid);
            if(!user) {
                throw new Error('user does not exist');
            }
            if(token === session_token) {
                 const token_data = verify_token(session_token);
               
                 if(!token_data) {
                    throw new Error('Invalid session')
                 }
                 const now =  createUTCDate();
                 if(now.valueOf() < token_data.validuntil) {
                    throw new Error('Session expired');
                 }
                  
                const id_token =  generate_token({
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname,
                    iat: Date.now() / 1000,
                    exp: id_expire,
                    sub: user._id
                });

                const access_token  =  generate_token({
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname,
                    role: user.role,
                    iat: Date.now() / 1000,
                    exp: access_expire,
                    sub: user._id
                });

                const refresh_token  =  generate_token({
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname,
                    iat: Date.now() / 1000,
                    exp: refresh_expire,
                    sub: user._id
                });

                const tk =  make_token({
                    id: crypto.randomUUID(),
                    token: refresh_token,
                    validuntil: refresh_expire,
                    loginid,
                });

                const token_save = await token_db.AddToken({
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
                        maxAge: 31556953,
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
                        maxAge: 31556953,
                        sameSite: 'Lax', 
                        path: '/' 
                    }
                }
                
                cookies.push(refresh_session_cookie);
                cookies.push(refresh_exp_cookie);
                return {
                    cookies,
                    data: {
                        id: {
                            token: id_tokenm,
                            valid_until: id_expire
                        },
                        refresh: {
                            token: refresh_token,
                            valid_until: refresh_expire
                        },
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
            throw ex;
        }
    }

}

module.exports =  refresh_token;