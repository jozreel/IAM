const authorize_factory = require("./authorize");
const AuthorizePost =  require('./authorizr-post');
const login =  require('./login');
const fd =  require('../../FD');
const {login_db, app_db, user_db} =  require('../../DataDrivers/MongoDB');



module.exports =  Object.freeze({
    Authorize: authorize_factory({verify_token: fd.access_utils.verify_toket_asymetric}),
    AuthorizePost: AuthorizePost({verify_token: fd.access_utils.verify_toket_asymetric}),
    Login: login({login_db, applicationdb: app_db, ad_utils: fd.ad_utils, user_db})
})