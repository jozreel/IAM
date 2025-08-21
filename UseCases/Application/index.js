const db =  require('../../DataDrivers/MongoDB');
const add_app =  require('./add-application');
const update_app = require('./update-application');
const get_app =  require('./get-application');
const list_apps =  require('./list-applications');
const delete_app =  require('./delete-application');
const create_api_key = require('./create-api-key');
const verify_api_key = require('./verify-apikey');
const {verify_token, generate_unique_key} =  require('../../FD').access_utils;
const app_db =  db.app_db;
const user_db =  db.user_db;
const role_db =  db.role_db;
const access_db = db.access_db;

module.exports = {
    add_app: add_app({app_db}),
    update_app: update_app({app_db,user_db, role_db, access_db, generate_unique_key}),
    get_app: get_app({app_db}),
    list_apps: list_apps({app_db, verify_token, generate_unique_key}),
    delete_app: delete_app({app_db}),
    create_api_key: create_api_key({app_db}),
    verify_app_key: verify_api_key({app_db})

  
};