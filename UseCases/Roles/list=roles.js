const list_roles = ({role_db}) => {
    return async (req) => {
        try {
            const appid =  req.params.appid;
            const  res =  await role_db.GetAppRoles(appid);
            return res;

        } catch(ex) {
            throw ex;
        }
    }
}
module.exports = list_roles;