const post_login_controller =  require('./post-login-controller');
const list_logins_controller =  require('./list-logins-controller');
const login_service =  require('../../UseCases/Login');

const add_login = login_service.add_login;
const list_logins =  login_service.list_logins;

module.exports =  Object.freeze({
    post_login: post_login_controller({add_login}),
    list_logins: list_logins_controller({list_logins})
});