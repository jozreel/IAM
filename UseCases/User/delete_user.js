const delete_user_use_case = ({user_db}) => {
    return async (id) => {
        try {
            const exist = await user_db.get_user(id);
            if(!exist) {
                throw new RangeError('The user does not exist');
            }
            const result = await user_db.delete_user(id);
            if(result === 0) {
                throw new Error('Could not delete the application');
            }
            return {deletedCount: result};

        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = delete_user_use_case;