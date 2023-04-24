const Router = require('express').Router;
const auth_router =  Router();
const raw_handler = require('../FD').raw_request_handler;
const auth_controller =  require('../Controllers/Auth');
auth_router.get('/', raw_handler(auth_controller.get_auth));

module.exports = auth_router;
