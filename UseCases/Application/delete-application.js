const delete_application = ({ app_db }) => {
    return async (id) => {
        try {
            const app = await app_db.get_application(id);
            if(!app) {
                throw new Error('The app was not found');
            }
            const result =  await app_db.delete_application(id);
            if(result === 0) {
                throw new Error('Could not delete the application');
            }
            return({deletedCount: result});

    } catch (ex) {
            throw ex;

        }
    }
}
module.exports = delete_application;