const authorize_factory = require("./authorize");
const AuthorizePost =  require('./authorizr-post');
const fd =  require('../../FD');



module.exports =  Object.freeze({
    Authorize: authorize_factory({verify_token: fd.access_utils.verify_toket_asymetric}),
    AuthorizePost: AuthorizePost({verify_token: fd.access_utils.verify_toket_asymetric})
})