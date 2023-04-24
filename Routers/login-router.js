const {Router, json} =  require('express');
const request_handler = require('../FD').request_handler;
const login_controller = require('../Controllers/Login');

const login_router =  Router();
login_router.post('/', json(), request_handler(login_controller.post_login));
login_router.get('/', request_handler(login_controller.list_logins));

module.exports =  login_router;