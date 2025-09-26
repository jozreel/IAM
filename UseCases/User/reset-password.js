const createUser = require('../../Entities/User');
const ResetPassword = ({user_db, dateDiff})=> {

    return async (id, data) => {
        try {
            console.log(data);
            const exist_u =  await user_db.get_user(id);
            if(!exist_u) {
                throw new Error('User not found');
            }
            const exist = exist_u.ToJson();
           

            if(data.resetcode !== exist.resetcode) {
                throw new Error('Invalid reset link');
            }
            if(dateDiff(exist.resetcodecreationtime, Date.now(), 'minutes') > 5) {
                throw new Error('Reset link expired')
            }
            const user = createUser({...exist, ...data, resetcode: null});
            user.setLastPasswordChangeDate(new Date());
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

            return user.ToJson();

        } catch (ex) {
            throw ex;
        }
    }

}
module.exports =  ResetPassword