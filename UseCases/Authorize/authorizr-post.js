const authorization_code = require("./authorization-code");

const AuthorizePost = ({verify_token}) => {
    try {
       return async(req) => {
         try {

            const auth_type = req.data?.response_type;
            if(auth_type === 'code') {
                const auth_code =  authorization_code(verify_token);
                console.log(req.data)
                return await auth_code(req.data);
            }

         } catch (ex) {
            console.log(ex);
            throw ex;
         }
       }

    } catch(ex) {
        throw ex;
    }
}

module.exports =  AuthorizePost;