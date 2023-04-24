const list_logins_use_case = ({login_db, user_db, app_db, createUTCDate}) => {
    const logindetails =  async logins => {
        for (let login of logins) {
            if(login.uid) {
                login.userdetail =  await user_db.get_user(login.uid);
            }
            if(login.appid) {
                login.appdetail = await app_db.get_application(login.appid);
            }
        }
    }
    return async (query) => {
        try {
            const from = query.from ? createUTCDate(parseInt(query.from)) :null;
            const to =  query.to ? createUTCDate(parseInt(query.to)) : query.from;
            const uid =  query.uid;
            const skip =  query.skip;
            const limit =  query.limit;
            const logins =  await login_db.list_logins({skip,limit, uid, from, to});
            await logindetails(logins);
            return logins;
        } catch (ex) {
            throw ex;
        }
    }
}
module.exports =  list_logins_use_case;