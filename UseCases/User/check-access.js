const check_app_access = ({user_db, decode_token}) => {
    return async (data) => {
        try {
            const usr =  data.access.uid;
            code = data.query.accesscode;
            const appid = data.appid;
            
            const app = await user_db.get_check_acces(appid, code);
            if(!app) {
                throw RangeError("No match forund for this user to the application accesscode");
            }
            return {hasaccess: true};

        } catch (ex) {
            throw ex;
        }
    }
}
module.exports =  check_app_access;