const make_login =  require('../../Entities/Login');
const two_factor = ({login_db, user_db}) => {
    return async (req) => {
        try {
            const multifactor_provider =  'local';
            if(multifactor_provider === 'local') {
                const {userid, authcode, loginid} = req.data;
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