const get_auth_usecase = ({user_db, app_db, app_api_auth_midleware , auth_midleware, app_key_check }) => {
    return async (req, res) => {
        try {
        if(req.query.cmd && req.query.cmd.toLowerCase() === 'chk_auth_token') {
            const access =  auth_midleware(req, res, next = () =>{});
            console.log('ACCESS', access);
            if(!access) {
              const uid =  req.access.uid;
              const user = await user_db.get_user(uid);
              if(user.status === -1) {
                  throw new RangeError('User not active');
              }
              return {user};
            }
        }
        if(req.query.cmd && req.query.cmd.toLowerCase() === 'chk_api_token') {
            const access = app_api_auth_midleware(req, res, next=()=>{});
            
            if(!access) {
              return {};
            }
        }
        if(req.query.cmd && req.query.cmd.toLowerCase() === 'chk_app_token') {
            const token =  req.query.apikey;
            const result =  app_key_check(req, res,token);
            if(result !== 403) {
                const appid =  result.app;
                const app =  await app_db.get_application(appid);
                if(app.disabled) {
                    throw new Error('Invalid app');
                }
                return  app;
            }


        }
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
    }
}
module.exports =  get_auth_usecase;