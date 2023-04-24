const {app_secret} = require('../../KEYS');
const get_oauth_usecase = ({jwt}) => {
    return async (query) => {
        try {
            console.log(query)
            const {
                response_type,
                client_id,
                redirect_uri,
                scope,
                state,
                code_challenge,
                code_Challenge_method
            } =  query;
            if(!response_type || response_type !== 'code') {
                throw new Error('Invalid response type')
            }
            if (!client_id) {
                throw new Error('Client id is mising')
            }
            if (!redirect_uri) {
                throw new Error('You must suply a redirect uri')
            }
            if(!scope) {
                throw new Error('Scope is required')
            }
            if(!state) {
                throw new Error('State parameter is required')
            }
            if(code_challenge && !code_Challenge_method) {
                throw new Error('A code challenge method was not supplied')
            }
            auth_code =  jwt({client_id, scope, code_challenge}, app_secret);
            new_redirect = `${redirect_uri}?code=${auth_code}&state=${state}`
            return {
                redirect_uri: new_redirect
            }
            
        } catch (ex) {
            throw ex;
        }
    }
}

module.exports =  get_oauth_usecase;