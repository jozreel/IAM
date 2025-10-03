const AddToken = require("./add-token");
const RefreshToken = require('./refresh-token');
const {app_db, token_db, login_db, user_db} = require('../../DataDrivers/MongoDB');
const {access_utils, date_util, date_utils} =  require('../../FD');

module.exports =  Object.freeze({
    AddToken: AddToken({app_db, 
        token_db,
        login_db,
         user_db, 
         verify_token: access_utils.verify_toket_asymetric,
         decode_token: access_utils.verify_toket_asymetric,
         get_creds: access_utils.get_basic_creds, 
         generate_token: access_utils.jwt_asymetric,
         createUtcDate: date_utils.createUTCDate,
         verify_string: access_utils.verify_string,
         hash_string: access_utils.hash_string
        }),
    RefreshToken:  RefreshToken({
        tokendb:token_db,
        userdb: user_db,
        app_db,
        get_creds: access_utils.get_basic_creds,
        decode_token: access_utils.verify_toket_asymetric,
        generate_token: access_utils.jwt_asymetric,
        verify_token: access_utils.verify_toket_asymetric,
        createUTCDate: date_utils.createUTCDate,
        hash_string: access_utils.hash_string,
        verify_string: access_utils.verify_string,
        login_db

    })
})