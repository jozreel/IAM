const AuthorizeHelpers = require('./authorize-helpers');
const file_helpers = require('./file-helper');
const {access_utils} =  require('../../FD');

module.exports = {
    file_helpers: file_helpers(),
    authorize_helpers: AuthorizeHelpers({encode_string: access_utils.base64_Url_encode})
}