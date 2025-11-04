const AuthorizeHelpers = require('./authorize-helpers');
const file_helpers = require('./file-helper');
const {access_utils} =  require('../../FD');
const security_helpers = require('./security-helpers.');
const {app_db, app_role_db, tenant_role_db, user_db} = require('../../DataDrivers/MongoDB');

module.exports = {
    file_helpers: file_helpers(),
    authorize_helpers: AuthorizeHelpers({encode_string: access_utils.base64_Url_encode}),
    security_helpers: security_helpers({app_db, app_role_db, tenant_role_db, user_db})
}