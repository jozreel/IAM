const multiFactorChannels = require('../../Entities/Application/multi-factor-channels');
const make_user = require('../../Entities/User');
const make_login =  require('../../Entities/Login');
const Register = ({user_db, app_db, login_db, message_service}) => {
    return async (req) => {
        try {
            
            const data =  req.data;
            const {username, email, password, redirect_uri, state, client_id, response_type, nonce, offline_access} =  data;
            const exist  = await user_db.find_by_username({username});
            if(exist) {
                throw new Error('User already exist');
            }
            const exist1 =  await user_db.find_by_email({email});
            if(exist1) {
                
                throw new Error('User already exist');
            }

            const app =  await app_db.get_application(client_id);
            if(!app) {
                throw new Error('Client not found');
            }
            if(response_type === 'code') {
                const randcode = Math.floor(100000 + Math.random() * 900000);
                console.log(randcode);
                data.multifactorcode = randcode;
                data.multifactorcodetime =  new Date();
                const user = make_user(data);
                
                user.createLastCodeCreatedTime();
                user.encryptPassword(user.getPassword());
                const result = await user_db.insert_user({
                    email: user.getEmail(),
                    username: user.getUsername(),
                    firstname: user.getFirstName(),
                    lastname: user.getLastName(),
                    password: user.getPassword(),
                    lastpasswords: user.getLastPasswords(),
                    lastpasswordchangedate: user.getLastPasswordChangeDate(),
                    photo: user.getPhoto(),
                    createddate: user.getCreatedDate(),
                    applications: user.getApplications(),
                    lastmodifieddate: user.getLastModifiedDate(),
                    telephone: user.getTelephone(),
                    status: user.getStatus(),
                    resetattemts: user.getResetAttemts()
                });


                const consents =  app.getConsents();
                let hasconsents =  false;
                if(consents && consents.length > 0) {
                    hasconsents =  true;
                }

              

            
                const two_factor_channel =  app.getMultifactorChannel() ||multiFactorChannels.EMAIL;
                const multifactor_enabled =  app.isMultifactorEnabled();
                
                  const logindata = {
                    ...data,
                    offlineaccess: data.offline_access,
                    codechallenge: data.code_challenge,
                    codechallengemethod: data.code_challenge_method,
                    appid: data.client_id,
                    success: true,
                    };

                    logindata.uid =  result.id;

                if(multifactor_enabled) {            
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
                        await  message_service.sms_util.SendSmsLocal('12843452904', msg)
                    }
            } else {
                const code = crypto.randomBytes(24).toString('hex');
                logindata.code = code;
                logindata.codeused =  false;

            }
           

            const login = make_login(logindata);

            const login_saved = await login_db.insert_login({
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
                        multifactorcodetime: login.getMultifactorCodeTime()
            });
            
            const loginid =  login_saved.id;
            login_saved.id =  login_saved._id;
            delete login_saved._id;
            if(hasconsents || multifactor_enabled) {
                return {
                    type: 'json',
                    data: login_saved
                }
            } else {
                 const url =  redirect_uri+'?code='+logindata.code+'&state='+state+"&session="+loginid;
                return {
                    type: 'redirect',
                    data: {
                        url
                    }
                }
            }

           
        } else {
            throw new Error('invalid response code');
        }
        
           

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  Register;