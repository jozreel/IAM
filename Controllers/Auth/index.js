const get_auth_controller =  require('./get-auth-controller');

const auth_service =  require('../../UseCases/Auth');

const get_auth =  auth_service.get_auth;
module.exports = Object.freeze({
    get_auth: get_auth_controller({get_auth})
});