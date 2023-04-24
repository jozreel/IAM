const make_user =  require('../../Entities/User');
const get_user_usecase = ({user_db}) => {
    return async ({id, email}) => {
        try {
            let user;
            if(id) {
              user =  await user_db.get_user(id);
            } else {
                user =  await user_db.find_by_email({email});
            }
            if(!user) {
                throw new RangeError('The user was not found');
            }
            user.telephone = `${user.telephone.substring(0, user.telephone.length-7)}*****${user.telephone.substring(user.telephone.length-2)}`;
            return user;
        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = get_user_usecase;