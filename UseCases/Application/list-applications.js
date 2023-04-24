const list_applications = ({app_db}) => {
    return  async (query) => {
        try {
            const skip =  query.skip;
            const limit =  query.limit;
            const result =  await app_db.list_applications({skip, limit});
            return result;

        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = list_applications;