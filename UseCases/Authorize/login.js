const { default: LoginProviderTypes } = require('../../Entities/Application/login-provider-types');
const make_user = require('../../Entities/User');
const make_login =  require('../../Entities/Login');
const crypto = require('crypto');
const login =  ({login_db, applicationdb, user_db, ad_utils}) => {
     

    const AdLogin = async (user, data) => {
        try {
            const adauth =  user.isAdUser() ? await ad_utils.authenticate_user({username: user.getUsername(), password: user.getPassword()}) : null;
            if(adauth) {
                const login =  make_login({
                    ...data,
                    uid: user._id.toString(),
                    success: true
                });
                if(data.responsse_type === 'code') {

                }
                return login
            } else {
                throw new Error("Invalid login");
            }
            
        } catch(ex) {
            throw ex;
        }
    
    }

    const OpenIdLogin = async (user, data) => {
        try {
        
            user.encryptPassword(user.getPassword());
            console.log(user.getPassword(), " NEW PASSWORD", data.oldpassword)
            if(user.getPassword() === data.oldpassword) {
               
                if(data.response_type === 'code') {
                   const res =  await create_code_login(data);  
                   return res;
                  
                } else {
                    throw new Error('Invalid response type');
                }
            } else {
                throw new Error('Invalid login');
            }


        } catch (ex) {
            throw ex;
        }

    }


    const create_code_login = async (data) => {
          console.log(data)
          const code = crypto.randomBytes(24).toString('hex');
                     const login =  make_login({
                                    ...data,
                                    appid: data.clientid,
                                    uid: data.uid.toString(),
                                    success: true,
                                    code
                                    
                                });
                    //update login entity to includde these
                    const login_saved = await login_db.insert_login({
                        appid: login.getAppID(),
                        uid: login.getUID(),
                        ip: login.getIP(),
                        code: login.getCode(),
                        responsetype: login.getResponseType(),
                        state: login.getState(),
                        createddate: login.getCreatedDate(),
                        success: login.isSuccessfull()
                    });
                    const res = {
                        id: login_saved._id,
                        code: code,
                        scope: data.scope,
                        clientid: data.clientid,
                        state: login.getState()
                    }

                    return res;
    }

    return async (req) => {
        try {
            
            const {username, password, code, scope, clientid, code_challenge, challenge_method, response_type, state} =  req.data;

            if(!username) {
                throw new Error('Invalid login');
            }
            if(!clientid) {
                throw new Error('Invalid application');
            }

            
            const uname = username.toLowerCase();
            const exist =  await user_db.find_by_username_or_email({username: uname, password: true});
            
            //check if userstatus is enabled
            if(!exist) {
                throw new Error('The user was not found');
            }

           
            const user =  make_user({...exist, password});
           
            const apps =  user.getApplications();
            const access =  apps.find(a => a.appid === clientid);
            if(!access) {
                throw new Error('You are not authaurised to access this application');
            }

            const app =  await applicationdb.get_application(access.appid);
            if(!app) {
                throw new Error('Invalid application');
            }

            const loginType =  app.getLoginProvider();

            if(loginType === LoginProviderTypes.AD) {

            } else if(loginType === LoginProviderTypes.OPENID) {
                const res = await OpenIdLogin(user, {code, scope, clientid, code_challenge, challenge_method, response_type, state, uid: exist._id, oldpassword: exist.password});
                return res;
            } else throw new Error('Invalid login provider type');

            if(!exist.ADUser) {
               user.encryptPassword(user.getPassword())
            } 
          
            
            

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
     }


}

module.exports =  login;


