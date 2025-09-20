const GetProfile = require("./get-priofile");
const {user_db, login_db, app_db} =  require('../../DataDrivers/MongoDB');
const {access_utils} =  require('../../FD');
const GetProfilePost = require("./get-profile-post");
module.exports = Object.freeze({
    GetProfile: GetProfile({logindb: login_db, userdb: user_db, appdb: app_db, verify_token: access_utils.verify_toket_asymetric}),
    GetProfilePost: GetProfilePost({logindb: login_db, userdb: user_db,appdb: app_db, verify_token: access_utils.verify_toket_asymetric})
});