const {Router, json} =  require('express');
const request_handler = require('../FD').request_handler;
const app_controller =  require('../Controllers/Applications');

const app_router =  Router();
app_router.post('/', json(), request_handler(app_controller.post_app));
app_router.put('/:id', json(), request_handler(app_controller.patch_app));
app_router.get('/:id', request_handler(app_controller.get_app));
app_router.get('/', request_handler(app_controller.list_apps));
app_router.delete('/:id', request_handler(app_controller.delete_app));
module.exports =  app_router;