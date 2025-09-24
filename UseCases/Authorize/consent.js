const crypto =  require('crypto');
const make_login =  require('../../Entities/Login');
const Consent = ({login_db, app_db}) => {
    return async (req) => {
        try {
            let {userid, authcode, loginid, client_id, redirect_uri, state, accepted} = req.data;
            accepted =  JSON.parse(accepted);
           
            const app =  await app_db.get_application(client_id);
            
            if(!app) {
            throw new Error('Invalid client');
            }
            const domain =  app.getDomain();
            
            if(accepted) {
                
              

              

               const login_inst = await login_db.get_login(loginid);
             
               if(!login_inst) {
                throw new Error("Invalid login");
               }
                 const login =  login_inst.ToJson();
               const code = crypto.randomBytes(24).toString('hex');
                const login_obj =  make_login({
                    ...login,
                    success: true,
                    code,
                    consent: accepted || false,
                    multifactorcode: null,
                    multifactorcodetime: null
                    
                });
               
                
                
                await login_db.update_login({
                    id: loginid,
                    code,
                    codecreationtime: login_obj.getCodeCreationTime(),
                    multifactorcode: login_obj.getMultiFactorCode(),
                    multifactorcodetime: null,
                    consent: login_obj.getConsent()
                });
               const url =  redirect_uri+'?code='+code+'&state='+login.state+"&session="+loginid;
               return {type: 'redirect', data: {url}}
            } else {
            
               return {type: 'redirect', data: {url: 'https://'+domain}}
            }

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports = Consent;