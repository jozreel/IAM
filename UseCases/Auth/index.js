const fd =  require('../../FD');
const auth_midleware = fd.access_utils.auth_midleware;
const app_api_auth_midleware =  fd.access_utils.app_api_auth_midleware;
const app_key_check =  fd.access_utils.app_key_check;
const db =  require('../../DataDrivers/MongoDB');
const user_db =  db.user_db;
const app_db =  db.app_db;

const get_auth_usecase =  require('./get-auth');
module.exports =  Object.freeze({
    get_auth: get_auth_usecase({user_db, app_db,auth_midleware, app_api_auth_midleware,app_key_check})
});