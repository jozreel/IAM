const multiFactorChannels = require('../../Entities/Application/multi-factor-channels');
const make_login = require('../../Entities/Login');
const ResendCode = ({login_db, user_db, app_db}) => {
    return async (req) => {
        try {

            const {sessionid} =  req.data; 
            const session =  await login_db.get_login(sessionid);
            if(!session) {
                throw new Error('Could not find session');
            }

        

            const existdata = session.ToJson();
            const user = await user_db.get_user(existdata.uid);
            if(!user) {
                throw new Error('User not found');
            }

            console.log(user);

            let tel = user.getTelephone();
            const app = await app_db.get_application(session.appid);
            console.log(app, session);
            let channel =  app.GetMultifactorChannel();
            const randcode = Math.floor(100000 + Math.random() * 900000);

            if(!tel) {
                channel =  multiFactorChannels.EMAIL;
            }

            if(channel === multiFactorChannels.EMAIL) {
                const mail = {
                subject: "AUthorization code",
                html: `<p>Your authentication code id ${randcode} </p>`,
                to: 'jozreellaurent@outlook.com',
                from: "support@veppz.com"
                }
            
                await message_service.email_util.SendEmail(mail);
        
            } else if (channel === multiFactorChannels.SMS) {
                const msg = 'Your one time use code is '+randcode;
                await  message_service.sms_util.SendSmsLocal(tel, msg)
            }

            ;
            console.log(randcode);
            existdata.multifactorcode = randcode;
            existdata.multifactorcodetime =  new Date();
            const ml =  make_login(existdata);
            
            const upd =  await login_db.update_login({
                id: sessionid, 
                multifactorcode: ml.getMultiFactorCode(),
                multifactorcodetime: ml.getMultifactorCodeTime()
            });
            return {codesent: true, sessionid}

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

}
module.exports =  ResendCode;