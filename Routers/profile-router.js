const cookieParser = require('cookie-parser');
const {Router, json} =  require('express');
const { request_handler } = require('../FD');
const { GetProfileController, PostProfileController } = require('../Controllers/Profile');

const profile_router = Router();

profile_router.get('/:userid', [cookieParser()], request_handler(GetProfileController));
profile_router.post('/', [json(), cookieParser()], request_handler(PostProfileController));

module.exports =  profile_router;