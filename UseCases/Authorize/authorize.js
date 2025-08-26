const authorization_code = require('./authorization-code');

const authorize_factory = ({verify_token}) => {


    return async (req) => {
        try {
        
            if(req.query && req.query.response_type === 'code') {
                const auth_code =  authorization_code({verify_token});
                return await auth_code(req.query);
            }

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}


module.exports = authorize_factory;