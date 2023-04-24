const createUser = require('../../Entities/User');
const crypto =  require('crypto');
const GenerateResetLink = ({user_db, dateDiff}) => {
    return async (id, data) => {
        try {

            const exist = await user_db.get_user(id);
            if(!exist) {
                throw new Error('The user does not exist');
            }
            console.log(exist.lastcode, data.code);
            if(exist.lastcode !== data.code) {
                throw new Error('Invalid authentication code');
            }
            if(dateDiff(exist.lastcodecreationtime,Date.now(), 'minutes') > 5) {
                throw new Error('Invalid code. Expired');
            }
            console.log(exist);
            const resetcode =  crypto.randomBytes(48).toString('hex');
            const user =  createUser({...exist, resetcode});
            const res = await user_db.update_user({
                id,
                resetcode: user.getResetCode(),
                lastcode: null,
                lastcodecreationtime: null,
                resetcodecreationtime: user.getResetCodeCreationTime(),
                lastmodifieddate: user.getLastModifiedDate()
            });

            return {
                resetcode,
                _id: id
            }

            

        } catch (ex) {
            throw ex;

        }
    }
}
module.exports =  GenerateResetLink;