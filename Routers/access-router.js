const {Router, json} =  require('express');
const { request_handler } = require('../FD');
const {GetAccessController, PostAccessController, PutAccessController, DeleteAccesController} =  require('../Controllers/Access');
const access_router =  Router();

access_router.get('/', request_handler(GetAccessController));
access_router.post('/', json(), request_handler(PostAccessController));
access_router.put('/', json(), request_handler(PutAccessController));
access_router.delete('/:id', request_handler(DeleteAccesController)),
access_router.get('/:id', request_handler(GetAccessController));

module.exports = access_router;