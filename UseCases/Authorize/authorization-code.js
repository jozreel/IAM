const crypto =  require('crypto');
const LoginPage = require('./login-page'); 
const RegisterPage = require('./register-page');
const authorization_code = ({verify_token}) => {
    return  async (data) => {
        try {
            const {response_type, scope, client_id,state, redirect_uri, code_challenge, code_challenge_method, session_cookie, promt} =  data;
            if(response_type !== 'code') {
                throw new Error('Invalid response type');
            }
            if(!scope) {
                throw new Error("A scope is required");
            }
            if(!client_id) {
                throw new Error("You must suply a client id");
            }
            if(!redirect_uri) {
                throw new Error('please suyply a redirect uril');
            }
            if(code_challenge && !code_challenge_method) {
                throw new Error('If prof of key code challenge is u8sed a code challenge method must be supplied');
            }

          
            const isopenid_scope =  scope.split(',').find(o=> o === 'openid');
           
            if(!isopenid_scope) {
                throw new Error('Missing openid in scope');
            }
            const has_offline =  scope.split(',').find(s => s === 'offline_access');
            if(has_offline) {
                data.offline_access = true;
            }
            //check validity of parameters.

            //check if user is logged in

            //possibly check cookies for refresh token if access token is expired;

           
            let loggedin =  false;
            let loginid;
            if(session_cookie) {
                payload = verify_token(session_cookie);
            
                loginid =  payload.sessionid;
                if(payload && payload.exp >= Math.floor(Date.now() / 1000)) {
                   
                    loggedin = true;
                } else {
                   
                    loggedin = false;
                }
            }
           
            if(promt && promt === 'create') {
                data.hasMultiFactor = true;
                return {
                    type: 'page',
                    data: RegisterPage(data)
                }
            }

           

            if(!loggedin) {
               
                data.hasMultiFactor = true;
                return {
                    type: 'page',
                    data: LoginPage(data)
                }
            } else {
                
                    const code = crypto.randomBytes(24).toString('hex');
                    const url =  redirect_uri+'?code='+code+'&state='+state+"&session="+loginid
                return {
                    
                    type: 'redirect',
                    data: {url}
                }
            }






        } catch (ex) {
            console.log(ex)
            throw ex;
        }
    }
}

module.exports = authorization_code;