const list_applications = ({app_db}) => {
    return  async (query) => {
        try {
            const skip =  query.skip;
            const limit =  query.limit;
            const result =  await app_db.list_applications({skip, limit});
            const json_res =  result.map(r => r.ToJson());
            return json_res

        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = list_applications;