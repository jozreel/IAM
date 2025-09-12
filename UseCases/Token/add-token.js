const { CLIENT_CREDENTIALS, PKCE } = require('../../Entities/Application/cred-type');
const make_token =  require('../../Entities/Token');
const { authorize_helpers } = require('../Helpers');



const AddToken = ({token_db, app_db , user_db, login_db, get_creds, generate_token,  createUtcDate, verify_string}) => {
    return async(req) => {
        try {
            
             const {client_id, loginid, cred_type, code_verifier} =  req.data;
            const login = await login_db.get_login(loginid);
          
            if(!login) {
                throw new Error("No login found for this user")
            }

         


           
            const utcnow =  createUtcDate();
            const utccreated =  createUtcDate(login.codecreationtime);
            if(utccreated.valueOf() + (50 * 5) > utcnow) {
                throw new Error('Code expired');
            }
            const app =  await app_db.get_application(client_id);

            if(!app) {
                throw new Error('Token generation error. Application not found');
            }
            const userid =  login.uid;
            const user =  await user_db.get_user(userid);

            if(!user) {
                throw new Error('Authentication error');
            }

                
         
            if(cred_type === CLIENT_CREDENTIALS ){
                if(!req.credentials) {
                    throw new Error('Invalod credentials')
                }
                const basic_creds =  get_creds(req.credentials);
            
            

            
        
                //check if crewds are valid
              
                const adminUser =  app.getAdminUsername();
                const adminPassword =  app.getAdminPassword();
               
                const verified = await verify_string(basic_creds?.password, adminPassword); 
                
                if(basic_creds && basic_creds.username == adminUser && !verified) {
                throw new Error('Invalid client credentials');
                }
        } else if(cred_type === PKCE || code_verifier) {
            // validate the code challenge
            const code_challenge =  login.codechallenge;
            const code_challenge_method =  login.codechallengemethod;
            if(!codechallenge || !authorize_helpers.VerifyPkce(code_verifier, code_challenge, code_challenge_method)) {
                throw new Error('Authentication error');
            }
        } else {
            throw new Error('Invalid cred type')
        }

        const id_expire =  Math.floor((Date.now() / 1000) + (60 * 5));
        const access_expire =  Math.floor((Date.now() / 1000) + (60 * 30));
            
        const refresh_expire = Math.floor((Date.now() / 1000)) + 31560000; 
       
        const id_token_data = {
            username: user.username,
            email: user.password,
            fullname: user.fullname,
            iat: Math.floor(Date.now() / 1000),
            exp: id_expire,
            sub: user._id.toString(),
    
        }
        const nonce =  login.nonce;
        if(nonce) {
            id_token_data.nonce = nonce;
        }
        const id_token =  generate_token(id_token_data);

        const access_token  =  generate_token({
            username: user.username,
            email: user.password,
            fullname: user.fullname,
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
            exp: access_expire,
            sub: user._id.toString()
        });

        const refresh_token  =  generate_token({
            username: user.username,
            email: user.password,
            fullname: user.fullname,
            iat: Math.floor(Date.now() / 1000),
            exp: refresh_expire,
            sub: user._id.toString()
        });

        const tk =  make_token({
            id: crypto.randomUUID(),
            loginid,
            token: refresh_token,
            validuntil: refresh_expire
        });

        const token_save = await token_db.AddToken({token: refresh_token, loginid});
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
        


        const resp =  {
            data: {
            id: {token: id_token, valid_until: id_expire},
            access: {token: access_token, valid_until: access_expire},
            refresh: {token: refresh_token, valid_until: refresh_expire}
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