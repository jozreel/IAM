const list_access = ({access_db}) => {
    return async (req) => {
        try {
            const appid =  req.params.id;
            const res =  await access_db.GetAllAppAccess(appid);
            return res;

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  list_access;