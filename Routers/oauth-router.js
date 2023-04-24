const {Router, json} =  require('express');
const http_request_handler = require('../FD/request-handler');
const  html_request_handler =  require('../FD/html-request-handler');
const oauth_controller = require('../Controllers/Oauth');

const oauth_router =  Router();

oauth_router.get('/code', http_request_handler(oauth_controller.get_o_auth_code_controller));
oauth_router.get('/loginpage', html_request_handler(oauth_controller.get_oauth_login_page_controller))

module.exports = oauth_router;