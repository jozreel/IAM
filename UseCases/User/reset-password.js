const createUser = require('../../Entities/User');
const ResetPassword = ({user_db, dateDiff})=> {

    return async (id, data) => {
        try {
            console.log(data);
            const exist =  await user_db.get_user(id);
            if(!exist) {
                throw new Error('User not found');
            }

            if(data.resetcode !== exist.resetcode) {
                throw new Error('Invalid reset link');
            }

            if(dateDiff(exist.lastcodecreationtime,Date.now(), 'minutes') > 5) {
                throw new Error('Reset link expired')
            }
            const user = createUser({...exist, ...data, resetcode: null});
            user.setLastPasswordChangeDate(Date.now());
            const passwd = user.encryptPassword(data.password); 
            const lastpasswords = user.getLastPasswords();
            const fp = lastpasswords.length === 3 ? lastpasswords.shift(): null;
            lastpasswords.push(exist.password);
            const res =  await user_db.update_user({
                id,
                resetcode: null,
                resetcodecreationtime: null,
                password: passwd,
                lastpasswords,
                lastpasswordchangedate: user.getLastPasswordChangeDate()
            });

            return res;

        } catch (ex) {
            throw ex;
        }
    }

}
module.exports =  ResetPassword