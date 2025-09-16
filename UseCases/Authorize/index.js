const authorize_factory = require("./authorize");
const AuthorizePost =  require('./authorizr-post');
const login =  require('./login');
const fd =  require('../../FD');
const {login_db, app_db, user_db} =  require('../../DataDrivers/MongoDB');
const two_factor =  require('./two-factor');
const Consent = require("./consent");
const Logout = require("./logout");



module.exports =  Object.freeze({
    Authorize: authorize_factory({verify_token: fd.access_utils.verify_toket_asymetric, app_db}),
    AuthorizePost: AuthorizePost({verify_token: fd.access_utils.verify_toket_asymetric}),
    TwoFactor: two_factor({login_db, app_db}),
    Login: login({login_db, applicationdb: app_db, ad_utils: fd.ad_utils, user_db, message_service: fd.message_util}),
    Consent: Consent({login_db, app_db}),
    Logout: Logout({login_db, app_db})
})