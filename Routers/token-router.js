const {Router, json, urlencoded} = require('express');
const TokenController =  require('../Controllers/Token');
const { request_handler } = require('../FD');
const cookieParser = require('cookie-parser');

const  token_router = Router();
token_router.post('/', [urlencoded({extended: true}), cookieParser()], request_handler(TokenController.AddTokenCOntrooller)),
token_router.post('/refresh', [urlencoded({extended: true}), cookieParser()], request_handler(TokenController.RefreshTokenController))

module.exports =  token_router 