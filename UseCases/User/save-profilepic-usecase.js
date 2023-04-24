
const make_user =  require('../../Entities/User');
const save_profile_pic_usecase = ({user_db}) => {
    return async (id, data) => {
        try {
           
            const exist = await user_db.get_user(id,true);
            if(!exist) {
                throw new Error('The user was not found');
            }
            ;
            const user =  make_user({...exist, photo: data.filename});
            const res = await user_db.update_user({
                id,
                photo: {
                    file: user.getPhoto(),
                    type: data.mimetype
                },
                lastmodifieddate: user.getLastModifiedDate()
            });
            return res;
           

        } catch (ex) {
            throw ex;
        }
    }
}

module.exports = save_profile_pic_usecase;