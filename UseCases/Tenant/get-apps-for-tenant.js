const GetAppsFortenant = ({tenant_db}) => {
    return async req => {
        try {
            const {id} =  req.params;
            const res =  await tenant_db.get_applications_for_tenant(id)
            return res.map(r => r.ToJson());

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}
module.exports =  GetAppsFortenant;