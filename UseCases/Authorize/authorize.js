const LoginPage = require('./login-page'); 
const authorize_factory = ({verify_token}) => {


    

    const authorization_code = async (data) => {
        try {
            const {response_type, scope, client_id,state, redirect_uri, code_challenge, code_challenge_method} =  data;
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

            console.log('checking valid')

            //check validity of parameters.

            //check if user is logged in

            const token =  data.token;
            let loggedin =  false;
            if(token) {
                payload = verify_token(token);
                if(payload && payload.exp < Date.now() / 1000) {
                    loggedin =  false;
                } else {
                    loggedin = false;
                }
            }

            console.log(loggedin)

            if(!loggedin) {
                console.log('checking')
                return {
                    type: 'page',
                    data: LoginPage(data)
                }
            } else {
                return {
                    type: 'json',
                    data: {test: "one"}
                }
            }






        } catch (ex) {
            console.log(ex)
            throw ex;
        }
    }


    return async (req) => {
        try {
        
            if(req.query && req.query.response_type === 'code') {
                return await authorization_code(req.query);
            }

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}


module.exports = authorize_factory;