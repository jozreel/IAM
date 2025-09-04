const make_login =  require('../../Entities/Login');
const two_factor = ({login_db, app_db}) => {
    return async (req) => {
        try {
            const {userid, authcode, loginid, clientid} = req.data;
            const app =  await app_db.get_application(clientid);
            if(!app) {
                throw new Error('Invalid application');
            }
            const multifactor_provider =  app.multifactorprovider;
            if(multifactor_provider === 'local') {
                
                const login =  await login_db.get_login(loginid);
                if(!login) {
                    throw new Error('Could not find login');
                }
                if(authcode === login.authenticationcode) {
                    const code = crypto.randomBytes(24).toString('hex');
                    const login =  make_login({
                                ...login,
                                success: true,
                                code,
                                multifactorcode: null,
                                multifactorcodetime: null
                                
                            });
                    const upd =  await login_db.update_login({
                        id: loginid,
                        code,
                        multifactorcode: login.getMultiFactorCode(),
                        multifactorcodetime: null
                    });

                    return {...login, code}
                }
            }

            // implement for other multi factor providers

        } catch(ex) {
            throw ex;
        }
    }

}

module.exports =  two_factor;