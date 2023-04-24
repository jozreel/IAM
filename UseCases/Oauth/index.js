const {access_utils} = require('../../FD');

const get_o_auth_code_usecase = require('./get-oauth-code');
const get_oauth_login_page_usecase =  require('./get-oauth-login-page');

module.exports = Object.freeze({
    get_o_auth_code: get_o_auth_code_usecase({jwt: access_utils.jwt}),
    get_oauth_login_page: get_oauth_login_page_usecase()
});