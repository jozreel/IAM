const list_users_usecase = ({user_db, login_db}) => {
    const get_last_activity = async(users) => {
        try {
            for (let user of users) {
                const lastauth =  await login_db.get_last_login(user._id.toString());
                user.lastauth = lastauth;
            }

        } catch (ex) {
            throw ex;
        }

    }
    return async (query) => {
        try {
        const skip =  parseInt(query.skip || 0);
        const limit =  parseInt(query.limit || 0);
        const status =  query.status;
        const appid = query.appid;
        const q =  query.q;
        console.log(appid);
        const result =  await user_db.list_users({skip,limit,appid,q});
        await get_last_activity(result);
        return result;
        } catch (ex) {
            throw ex;
        }
    }
}

module.exports =  list_users_usecase;