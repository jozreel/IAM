const make_user =  require('../../Entities/User');
const update_user_usecase = ({user_db}) => {
    return async (id, changes) => {
        try {
         
            const exist = await user_db.get_user(id,true);
            if(!exist) {
                throw new Error('The user was not found');
            }
            if(exist.ADUser) {
                changes.fullname =  exist.fullname;
            }
            const user =  make_user({...exist, ...changes});
            if(changes.password) {
                user.encryptPassword(changes.password);
                const lastpasswords = user.getLastPasswords();
                const fp = lastpasswords.length === 3 ? lastpasswords.shift(): null;
                lastpasswords.push(exist.password);
                const inlast  =  lastpasswords.find(p => p === user.getPassword());
                if(inlast) {
                    throw new Error('Cannot reuse one of the lase three passwords');
                }
                user.setLastPasswords(lastpasswords);
                user.setLastPasswordChangeDate(new Date().valueOf());
            }
            const updates = await user_db.update_user({
                id,
                firstname: user.getFirstName(),
                lastname: user.getLastName(),
                photo: user.getPhoto(),
                password: user.getPassword(),
                lastpasswords: user.getLastPasswords(),
                lastpasswordchangedate: user.getLastPasswordChangeDate(),
                applications: user.getApplications(),
                roles: user.getRoles(),
                lastmodifieddate: user.getLastModifiedDate(),
                status: user.getStatus(),
                telephone: user.getTelephone()


            });
            return updates;

        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = update_user_usecase;