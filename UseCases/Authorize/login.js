const  LoginProviderTypes = require('../../Entities/Application/login-provider-types');
const make_user = require('../../Entities/User');
const make_login =  require('../../Entities/Login');
const crypto = require('crypto');
const multiFactorChannels = require('../../Entities/Application/multi-factor-channels');
const login =  ({login_db, applicationdb, user_db, ad_utils, message_service}) => {
     

    const AdLogin = async (user, data) => {
        try {
            const adauth =  user.isAdUser() ? await ad_utils.authenticate_user({username: user.getUsername(), password: user.getPassword()}) : null;
            if(adauth) {
                let res;
                if(data.responsse_type === 'code') {
                    if(data.multifactor_enabled) {
                        let two_factor_channel =  data.two_factor_channel;
                        const randcode = Math.floor(100000 + Math.random() * 900000);
                        data.multifactorcode = randcode;
                        res =  await create_basic_login(data);
                        user.createLastCodeCreatedTime();
                        const tel =  user.getTelephone();
                        if(!tel) {
                            two_factor_channel =  multiFactorChannels.EMAIL;
                        }
                        if(two_factor_channel === multiFactorChannels.EMAIL) {
                         const mail = {
                            subject: "AUthorization code",
                            html: `<p>Your authentication code id ${randcode} </p>`,
                            to: 'jozreellaurent@outlook.com',
                            from: "support@veppz.com"
                         }
                         
                         await message_service.email_util.SendEmail(mail);

                       } else if (two_factor_channel === multiFactorChannels.SMS) {
                         const msg = 'Your one time use code is '+randcode;
                         await  message_service.sms_util.SendSmsLocal(tel, msg)
                       }
                    } else {
                       res =  await create_code_login(data);
                   
                   }

                }
                return res;
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
           
            if(user.getPassword() === data.oldpassword) {
               
                if(data.response_type === 'code') {
                   let res;
                   if(data.multifactor_enabled) {
                        let two_factor_channel =  data.two_factor_channel;
                        const randcode = Math.floor(100000 + Math.random() * 900000);
                        data.multifactorcode = randcode;
                        data.multifactorcodetime = new Date();
                        console.log(data.multifactorcode);
                        res =  await create_basic_login(data);
                        user.createLastCodeCreatedTime();
                        const tel =  user.getTelephone();
                        console.log(tel)
                        if(!tel) {
                            two_factor_channel =  multiFactorChannels.EMAIL;
                        }
                      
                       if(two_factor_channel === multiFactorChannels.EMAIL) {
                         const mail = {
                            subject: "AUthorization code",
                            html: `<p>Your authentication code id ${randcode} </p>`,
                            to: 'jozreellaurent@outlook.com',
                            from: "support@veppz.com"
                         }
                         
                         await message_service.email_util.SendEmail(mail);

                       } else if (two_factor_channel === multiFactorChannels.SMS) {
                         const msg = 'Your one time use code is '+randcode;
                         await  message_service.sms_util.SendSmsLocal(tel, msg)
                       }
                   } else {
                       res =  await create_code_login(data);
                   
                   }
                   
                   return res;
                  
                } else {
                    throw new Error('Invalid response type');
                }
            } else {
                throw new Error('Invalid login');
            }


        } catch (ex) {
            console.log(ex);
            throw ex;
        }

    }


    const create_code_login = async (data) => {
        
          const code = crypto.randomBytes(24).toString('hex');
          const login =  make_login({
                id: crypto.randomUUID(),
                ...data,
                offlineaccess: data.offline_access,
                codechallenge: data.code_challenge,
                codechallengemethod: data.code_challenge_method,
                appid: data.client_id,
                uid: data.uid.toString(),
                success: true,
                code,
                codeused: false
                
                
            });
                    //update login entity to includde these
                    const login_saved = await login_db.insert_login({
                        id: login.getId(), 
                        appid: login.getAppID(),
                        uid: login.getUID(),
                        ip: login.getIP(),
                        code: login.getCode(),
                        offlineaccess: login.getOfflineAcces(),
                        responsetype: login.getResponseType(),
                        state: login.getState(),
                        nonce: login.getNonce(),
                        createddate: login.getCreatedDate(),
                        codechallenge: login.getCodeChallenge(),
                        codechallengemethod: login.getCodeChallengeMethod(),
                        success: login.isSuccessfull(),
                        multifactorcode: login.getMultiFactorCode(),
                        multifactorcodetime : login.getMultifactorCodeTime()
                    });
                    const res = {
                        id: login_saved._id,
                        code: code,
                        codeused: login.isCodeUsed(),
                        scope: data.scope,
                        client_id: data.client_id,
                        state: login.getState(),
                        consentrequired: data.consentrequired && data.consentrequired.length > 0 ? true : false
                    }

                    return res;
    }


    const create_basic_login = async (data) => {
        try {
            
          const login =  make_login({
                     id: crypto.randomUUID(), 
                    ...data,
                    offlineaccess: data.offline_access,
                    codechallenge: data.code_challenge,
                    codechallengemethod: data.code_challenge_method,
                    appid: data.client_id,
                    uid: data.uid.toString(),
                    success: true,
                    });

                  
                    //update login entity to includde these
                    const login_saved = await login_db.insert_login({
                        id: login.getId(),
                        appid: login.getAppID(),
                        uid: login.getUID(),
                        ip: login.getIP(),
                        offlineaccess: login.getOfflineAcces(),
                        responsetype: login.getResponseType(),
                        state: login.getState(),
                        nonce: login.getNonce(),
                        createddate: login.getCreatedDate(),
                        success: login.isSuccessfull(),
                        codechallenge: login.getCodeChallenge(),
                        codechallengemethod: login.getCodeChallengeMethod(),
                        multifactorcode: login.getMultiFactorCode(),
                        multifactorcodetime : login.getMultifactorCodeTime()
                    });
                    const res = {
                        id: login_saved._id,
                        scope: data.scope,
                        client_id: data.client_id,
                        state: login.getState(),
                        consentrequired: data.consentrequired && data.consentrequired.length > 0 ? true : false
                    }

                    return res;

        } catch (ex) {
            throw ex;
        }


    }

    return async (req) => {
        try {
            
            const {username, password, code, scope, client_id, code_challenge, code_challenge_method, response_type, state, nonce, offline_access} =  req.data;

            if(!username) {
                throw new Error('Invalid login');
            }
            if(!client_id) {
                throw new Error('Invalid application');
            }

            
            const uname = username.toLowerCase();
            const exist_obj =  await user_db.find_by_username_or_email({username: uname, password: true});
            
            //check if userstatus is enabled
            if(!exist_obj) {
                throw new Error('The user was not found');
            }
            const exist = exist_obj.ToJson();

                      
            const user =  make_user({...exist, password});
           
            const apps =  user.getApplications();
          //  const access =  apps.find(a => a.appid === client_id);
           // if(!access) {
             //   throw new Error('You are not authaurised to access this application');
           // }

            const app =  await applicationdb.get_application(client_id);
            if(!app) {
                throw new Error('Invalid application');
            }

            const loginType =  app.getLoginProvider();

            if(loginType === LoginProviderTypes.AD) {

            } else if(loginType === LoginProviderTypes.OPENID) {
              
                if(exist.ADUser) {
               const res = await AdLogin(user, {code, scope, client_id, code_challenge, code_challenge_method, response_type, state, uid: exist.id, oldpassword: exist.password,
                    two_factor_channel: app.getMultifactorChannel(),
                    multifactor_enabled: app.isMultifactorEnabled(),
                    nonce,
                    offline_access,
                    consentrequired: app.getConsents()
                });
                return res;
                } else {
                const res = await OpenIdLogin(user, {code, scope, client_id, code_challenge, code_challenge_method, response_type, state, uid: exist.id, oldpassword: exist.password,
                    two_factor_channel: app.getMultifactorChannel(),
                    multifactor_enabled: app.isMultifactorEnabled(),
                    nonce,
                    offline_access,
                    consentrequired: app.getConsents()
                });
                return res;
            }
            } else throw new Error('Invalid login provider type');

            
          
            
            

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
     }


}

module.exports =  login;


