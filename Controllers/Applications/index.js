const app_service = require('../../UseCases/Application');
const post_app_controller =  require('./post-application-controller');
const patch_app_controller = require('./patch-application-controller');
const get_app_controller =  require('./get-application-controller');
const list_app_controller =  require('./list-application-controller');
const delete_app_controller = require('./delete-application-controller');

const add_app =  app_service.add_app;
const update_app =  app_service.update_app;
const get_app =  app_service.get_app;
const list_apps = app_service.list_apps;
const delete_app =  app_service.delete_app;

module.exports = Object.freeze({
    post_app: post_app_controller({add_app}),
    patch_app: patch_app_controller({update_app}),
    get_app: get_app_controller({get_app}),
    list_apps: list_app_controller({list_apps}),
    delete_app: delete_app_controller({delete_app})
});