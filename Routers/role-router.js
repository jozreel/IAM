const {Router, json} =  require('express');
const { request_handler } = require('../FD');
const role_conmtroller =  require('../Controllers/Roles');


const role_route =  Router()

role_route.get('/', json(), request_handler(role_conmtroller.ListRoleController));
role_route.post('/', json(), request_handler(role_conmtroller.AddRoleController));
role_route.put('/:id', json(), request_handler(role_conmtroller.UpdateRoleController));
role_route.get('/:id', request_handler(role_conmtroller.GetRoleController));
role_route.delete('/:id', request_handler(role_conmtroller.DeleteRoleController));
role_route.put('/addaccess/:id', json(), request_handler(role_conmtroller.AddAccessToRoleController));
role_route.put('/removeaccess/:id', json(), role_conmtroller.RemoveAccessFromRoleController)

module.exports = role_route;