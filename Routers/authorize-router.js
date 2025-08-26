const {Router, json, urlencoded} =  require('express');
const mixed_request_handler = require('../FD/mixed-request-handler');
const auth_controller = require('../Controllers/Authorize');
const cookieParser = require('cookie-parser');

const authorize_router =  Router();

authorize_router.get('/', [cookieParser()], mixed_request_handler(auth_controller.AuthorizeController));
authorize_router.post('/', [cookieParser(), urlencoded({extended: true})], mixed_request_handler(auth_controller.AuthorizePostController))

module.exports = authorize_router;