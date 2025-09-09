const {Router, json, urlencoded} = require('express');
const TokenController =  require('../Controllers/Token');
const { request_handler } = require('../FD');

const  token_router = Router();
token_router.post('/', urlencoded({extended: true}), request_handler(TokenController.AddTokenCOntrooller)),
token_router.post('/refresh', urlencoded({extended: true}), request_handler(TokenController.RefreshTokenContriller))

module.exports =  token_router 