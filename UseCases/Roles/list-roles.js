const list_roles = ({role_db}) => {
    return async (req) => {
        try {
            let appid =  req.params.appid;
            if(!appid) {
                appid =  req.appid;
            }
            if(!appid) {
                throw new Error('Invalid app id');
            }
            const  res =  await role_db.GetAppRoles(appid);
            return res;

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}
module.exports = list_roles;