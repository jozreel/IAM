const AddToken = require("./add-token");
const RefreshToken = require('./refresh-token');
const {app_db, token_db, login_db, user_db} = require('../../DataDrivers/MongoDB');
const {access_utils, date_util, date_utils} =  require('../../FD');

module.exports =  Object.freeze({
    AddToken: AddToken({app_db, 
        token_db,
        login_db,
         user_db, 
         get_creds: access_utils.get_basic_creds, 
         generate_token: access_utils.jwt_asymetric,
         createUtcDate: date_utils.createUTCDate,
         verify_string: access_utils.verify_string
        }),
    RefreshToken:  RefreshToken({
        tokendb:token_db,
        userdb: user_db,
        decode_token: access_utils.verify_toket_asymetric,
        generate_token: access_utils.jwt_asymetric,
        verify_token: access_utils.verify_toket_asymetric,
        createUTCDate: date_utils.createUTCDate

    })
})