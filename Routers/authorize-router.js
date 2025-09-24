const {Router, json, urlencoded} =  require('express');
const mixed_request_handler = require('../FD/mixed-request-handler');
const auth_controller = require('../Controllers/Authorize');
const cookieParser = require('cookie-parser');
const { request_handler } = require('../FD');
const MixedRequestHandler = require('../FD/mixed-request-handler');

const authorize_router =  Router();

authorize_router.get('/', [cookieParser()], mixed_request_handler(auth_controller.AuthorizeController));
authorize_router.post('/', [cookieParser(), urlencoded({extended: true})], mixed_request_handler(auth_controller.AuthorizePostController))
authorize_router.post('/login', [cookieParser(), json()], request_handler(auth_controller.LoginController))
authorize_router.post('/twofactor', json(), mixed_request_handler(auth_controller.TwoFactorController))
authorize_router.post('/consent', [urlencoded({extended: true})],  mixed_request_handler(auth_controller.ConsentController))
authorize_router.post('/logout', [cookieParser(), urlencoded({extended: true})], mixed_request_handler(auth_controller.LogoutController))
authorize_router.post('/register', [json()], mixed_request_handler(auth_controller.RegisterController));
authorize_router.post('/resendcode', [json()], request_handler(auth_controller.ResendCodeController));
authorize_router.get('/resetpassword', MixedRequestHandler(auth_controller.ResetPasswordPageController))
module.exports = authorize_router;