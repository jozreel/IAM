const db =  require('../../DataDrivers/MongoDB');
const user_db =  db.user_db;
const login_db = db.login_db;
const add_user =  require('./add-user');
const update_user =  require('./update-user');
const get_user = require('./get-user');
const list_users = require('./list-users');
const delete_user =  require('./delete_user');
const fd =  require('../../FD');
const GenerateCodeUseCase = require('./generate-code');
const ProcessCodeUsecase = require('./process-code');
const save_profile_pic_usecase = require('./save-profilepic-usecase');
const get_profile_pic_usecase = require('./get-profilepic-usecase');
const ad_utils =  fd.ad_utils;
const {dateDiff} =  fd.date_utils;
const {file_helpers} = require('../Helpers');
const GenerateResetLink = require('./generate-reset-link');
const ResetPassword = require('./reset-password');
const CheckPasswordLinkUsecase = require('./check-password-link-usecase');
const AssignRoleToUser = require('./assign-role-to-user');
const sms_utils = fd.sms_util;

module.exports = Object.freeze({
    add_user: add_user({user_db, ad_utils, sms_utils, verify_token: fd.access_utils.verify_toket_asymetric}),
    update_user: update_user({user_db}),
    get_user: get_user({user_db}),
    list_users: list_users({user_db, login_db}),
    delete_user: delete_user({user_db}),
    generate_code: GenerateCodeUseCase({user_db, sms_utils}),
    process_code: ProcessCodeUsecase({user_db, dateDiff}),
    save_profile_pic: save_profile_pic_usecase({user_db}),
    get_profile_pic: get_profile_pic_usecase({user_db, read_file: file_helpers.read_file}),
    generate_reset_link: GenerateResetLink({user_db, dateDiff}),
    reset_password: ResetPassword({user_db, dateDiff}),
    check_password_reset_code: CheckPasswordLinkUsecase({user_db, dateDiff}),
    AssignRoleToUser: AssignRoleToUser({user_db, app_role_db: db.app_role_db, tenant_role_db: db.tenant_role_db})
}
);