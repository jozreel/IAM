const make_login =  require('../../Entities/Login');
const crypto = require('crypto');
const two_factor = ({login_db, app_db}) => {
    return async (req) => {
        try {
            const {userid, authcode, loginid, client_id, redirect_uri, state} = req.data;
            const app =  await app_db.get_application(client_id);
            if(!app) {
                throw new Error('Invalid application');
            }
            const multifactor_provider =  app.getMultiFctorProvider();
           
            if(multifactor_provider === 'local') {
              
                const login_obj =  await login_db.get_login(loginid);
                
                if(!login_obj) {
                    throw new Error('Could not find login');
                }
                const login =  login_obj.ToJson();
              
                if(login.multifactorcode && authcode === login.multifactorcode.toString()) {
                    const code = crypto.randomBytes(24).toString('hex');
            
                    const login_obj =  make_login({
                                ...login,
                                success: true,
                                code,
                                codeused: false,
                                multifactorcode: null,
                                multifactorcodetime: null
                                
                            });

                    //check the code challenge again.
                   
                     await login_db.update_login({
                        id: loginid,
                        code,
                        codeused: login_obj.isCodeUsed(),
                        codecreationtime: login_obj.getCodeCreationTime(),
                        multifactorcode: login_obj.getMultiFactorCode(),
                        multifactorcodetime: null
                    });
                    
                    const url =  redirect_uri+'?code='+code+'&state='+login.state+"&session="+loginid
                    const consentrequired = app.getConsents();
                    if(consentrequired && consentrequired.length > 0) {
                         return {type: 'json', data: {consentrequired}}
                    } else {
                         return {type: 'redirect', data: {url}}
                    }
                   
                } else {
                    throw new Error('Invalid auth  code');
                }
            }

            // implement for other multi factor providers

        } catch(ex) {
            console.log(ex)
            throw ex;
        }
    }

}

module.exports =  two_factor;