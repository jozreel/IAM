const list_access = ({access_db}) => {
    return async (req) => {
        try {
            const appid =  req.id;
            const res =  await access_db.GetAllAppAccess(appid);
            return res;

        } catch(ex) {
            throw ex;
        }
    }
}

module.exports =  list_access;