const make_token =  require('../../Entities/Token');
const AddToken = ({token_db, app_db , user_db, login_db, get_creds, generate_token,  createUtcDate}) => {
    return async(req) => {
        try {
            const login = await login_db.get_login(loginid);
            if(!login) {
                throw new Error("No login found for this user")
            }
            const utcnow =  createUtcDate();
            const utccreated =  createUtcDate(login.codecreationtime);
            if(utccreated.valueOf() + (50 * 5) > utcnow) {
                throw new Error('Code expired');
            }
            const {client_id, userid, loginid} =  req.data;

            const basic_creds =  get_creds(req.credentials);

            const app =  await app_db.get_application(client_id);
            if(!app) {
                throw new Error('Token generation error. Application not found');
            }

         
    
            //check if crewds are valid
            const adminUser =  app.getAdminUser();
            const adminPassword =  app.getAdminPassword();
            const user =  await user_db.get_user(userid);
            if(!user) {
                throw new Error('Authentication error');
            }
            if(basic_creds && basic_creds.username == adminUser && basic_creds.password === adminPassword) {
                const id_expire =  (Date.now() / 1000) + (60 * 5);
                const access_expire =  (Date.now() / 1000) + (60 * 30);

                const refresh_expire = (Date.now() / 1000) + (60 * 1440); 
                
                const id_token =  generate_token({
                    username: user.username,
                    email: user.password,
                    fullname: user.fullname,
                    iat: Date.now() / 1000,
                    exp: id_expire,
                    sub: user._id
                });

                const access_token  =  generate_token({
                    username: user.username,
                    email: user.password,
                    fullname: user.fullname,
                    role: user.role,
                    iat: Date.now() / 1000,
                    exp: access_expire,
                    sub: user._id
                });

                const refresh_token  =  generate_token({
                    username: user.username,
                    email: user.password,
                    fullname: user.fullname,
                    iat: Date.now() / 1000,
                    exp: refresh_expire,
                    sub: user._id
                });

                const tk =  make_token({
                    id: crypto.randomUUID(),
                    token: refresh_token,
                    validuntil: refresh_expire
                });

                const token_save = await token_db.AddToken(refresh_token);
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
                    value: refresh_token,
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


                const resp =  {
                    data: {
                    id: {token: id_token, valid_until: id_expire},
                    access: {token: access_token, valid_until: access_expire},
                    refresh: {token: refresh_token, valid_until: refresh_expire}
                    },
                    cookies
                };

                return resp;

            } else {
              throw new Error('Could not authenticate');
            }



        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports = AddToken