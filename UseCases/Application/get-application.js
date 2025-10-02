const get_application = ({app_db}) => {
    return async (id) => {
        try {
            const app = await app_db.get_application(id);
            return app.ToJson();

        } catch (ex) {
            throw ex;
        }
    }
}
module.exports =  get_application;