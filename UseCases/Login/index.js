const db =  require('../../DataDrivers/MongoDB');
const createUTCDate = require('../../FD').date_utils.createUTCDate;
const login_db =  db.login_db;
const user_db = db.user_db;
const app_db =  db.app_db;
const ad_utils =  require('../../FD').ad_utils;

const add_login =  require('./add-login');
const list_logins = require('./list-logins');

module.exports =  Object.freeze({
    add_login: add_login({login_db, user_db, ad_utils}),
    list_logins: list_logins({login_db, user_db,app_db, createUTCDate})
});