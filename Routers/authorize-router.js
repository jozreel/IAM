const {Router, json} =  require('express');
const mixed_request_handler = require('../FD/mixed-request-handler');
const auth_controller = require('../Controllers/Authorize');

const authorize_router =  Router();

authorize_router.get('/', mixed_request_handler(auth_controller.AuthorizeController));

module.exports = authorize_router;