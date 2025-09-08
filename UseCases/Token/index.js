const AddToken = require("./add-token");
const {app_db, token_db, login_db, user_db} = require('../../DataDrivers/MongoDB');
const {access_util, date_utils} =  require('../../FD');

module.exports =  Object.freeze({
    AddToken: AddToken({app_db, 
        token_db,
        login_db,
         user_db, 
         get_creds: access_utils.get_basic_creds, 
         generate_token: access_utils.jwt_asymetric,
         createUtcDate: date_utils.createUTCDate
        })
})