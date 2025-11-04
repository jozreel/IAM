const make_login =  require('../../Entities/Login');
const make_user = require('../../Entities/User');
const add_login_usecase  =  ({login_db, user_db, ad_utils}) => {
    return async (data) => {
        try {
            console.log(data);
            if(!data.email) {
                throw new Error('Invalid login');
            }
            if(!data.appid) {
                throw new Error('Invalid application');
            }
            const email = data.email.toLowerCase();
            const exist_user =  await user_db.find_by_email({email, password: true});
            
           
            //check if userstatus is enabled
            if(!exist_user) {
                throw new Error('The user was not found');
            }
            const exist =  exist_user.ToJson()
            const user =  make_user({...exist, password: data.password});
            const apps =  user.getApplications();
            const access =  apps.find(a => a.appid === data.appid);
           
            if(!access) {
             //   throw new Error('You are not authaurised to access this application');
            }
            if(!exist.ADUser) {
               user.encryptPassword(user.getPassword())
            } 
            const password =  user.getPassword();
            console.log(password);
            const adauth =  user.isAdUser() ? await ad_utils.authenticate_user({email: user.getEmail(), password: user.getPassword()}) : null;
            console.log(adauth, 'THE AUTH FROM AD');
            console.log(password, exist.password);
            if ((user.isAdUser() && adauth) || (password === exist.password)) {
                const login =  make_login({
                    ...data,
                    uid: exist.id.toString(),
                    success: true
                });
                const payload = {iat: new Date().valueOf(), exp: Math.floor(Date.now() /1000) + (60*60), aud: '1ca5521f-a1c5-4628-ba70-1b41833d0329', sub: login.getUID(), appid: login.getAppID()};
                if(!data.remember) {
                    payload.exp = Date.now() /1000 + (60*60);
                }
                const token =  login.createToken(payload);

                const login_saved = await login_db.insert_login({
                    appid: login.getAppID(),
                    uid: login.getUID(),
                    ip: login.getIP(),
                    createddate: login.getCreatedDate(),
                    success: login.isSuccessfull()
                });
                return {uid: login.getUID(), fullname: exist.fullname, token, sessionid: login_saved._id.toString()};
            } else {
                const login =  make_login({
                    ...data,
                    uid: exist.id.toString(),
                    success: false
                });
               await login_db.insert_login({
                    appid: login.getAppID(),
                    uid: login.getUID(),
                    ip: login.getIP(),
                    createddate: login.getCreatedDate(),
                    success: login.isSuccessfull()
                });
                throw new Error('Invalid login attemt');
            }


        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = add_login_usecase;