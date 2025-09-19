const Logout = ({login_db, app_db}) => {
    return async (req) => {
        try {
            const {client_id, sessionid} =  req.data;
            console.log(req.data);
             const app = await app_db.get_application(client_id);
             if(!app) {
                throw new Error('Oops something went wronmg');
             }

             const login_obj = await login_db.get_login(sessionid);
             if(login_obj) {
               const login =  login_obj.ToJson();
                if(login) {
                    await login_db.clear_login(sessionid, login.uid);
                }
            }

             const logout_url =  app.getLogoutUrl();
             const res = {
                type: 'redirect',
                data: {url: logout_url},
                clearcookies: [{name: 'refresh_session_cookie', options: {
                    path: '/'
                }}, {
                    name: 'refresh_expiry',
                    options: {path: '/'}
                }]
             };

             return res;

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  Logout;