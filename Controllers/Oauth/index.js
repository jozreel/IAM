const {get_o_auth_code, get_oauth_login_page} =  require('../../UseCases/Oauth');

const get_oauth_code_controiller = require('./get-oauth-code-controller');
const get_oauth_login_page_controller =  require('./get-oauth-login-page-controller');


module.exports = Object.freeze({
    get_o_auth_code_controller: get_oauth_code_controiller({get_o_auth_code}),
    get_oauth_login_page_controller: get_oauth_login_page_controller({get_oauth_login_page})
})