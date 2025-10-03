const authorize_factory = require("./authorize");
const AuthorizePost =  require('./authorizr-post');
const login =  require('./login');
const fd =  require('../../FD');
const {login_db, app_db, user_db} =  require('../../DataDrivers/MongoDB');
const two_factor =  require('./two-factor');
const Consent = require("./consent");
const Logout = require("./logout");
const Register = require("./register");
const ResendCode = require("./resend-code");

const GetResetPasswordPage = require("./get-reset-password-page");
const CreateResetLink = require("./create-reset-link");
const GetPasswordInput = require("./password-input");
const ChangePassword = require("./change-password");
const user_change_password =  require('../User/reset-password');
const GetPasswordChangeSuccessPage = require("./get-password-change-success-page");



module.exports =  Object.freeze({
    Authorize: authorize_factory({verify_token: fd.access_utils.verify_toket_asymetric, app_db, hash_string: fd.access_utils.hash_string, login_db}),
    AuthorizePost: AuthorizePost({verify_token: fd.access_utils.verify_toket_asymetric}),
    TwoFactor: two_factor({login_db, app_db}),
    Login: login({login_db, applicationdb: app_db, ad_utils: fd.ad_utils, user_db, message_service: fd.message_util}),
    Consent: Consent({login_db, app_db}),
    Logout: Logout({login_db, app_db}),
    Register: Register({user_db, app_db, login_db, message_service: fd.message_util}),
    ResendCode: ResendCode({login_db}),
    GetResetPasswordPage: GetResetPasswordPage(),
    CreateResetLink: CreateResetLink({user_db, message_service: fd.message_util}),
    GetPasswordInput: GetPasswordInput({user_db}),
    ChangePassword: ChangePassword({user_change_password: user_change_password({user_db,dateDiff: fd.date_utils.dateDiff}), hash_string:fd.access_utils.hash_string}),
    GetPasswordChangeSuccessPage: GetPasswordChangeSuccessPage({user_db, verify_string: fd.access_utils.verify_string})
})