const {Router, json} =  require('express');
const { AddTenantController, GetAppsForTenantConrtroller, AddTenantRoleController, GetTenantRolesController, RemoveTenantRoleController, GetTenantsForUserController, UpdateTenantController} = require('../Controllers/Tenant');
const { request_handler } = require('../FD');


const tenant_router = Router();
tenant_router.post('/roles/:id', [json()], request_handler(AddTenantRoleController))
tenant_router.post('/', json(), request_handler(AddTenantController));
tenant_router.get('/clients/:id', request_handler(GetAppsForTenantConrtroller));
tenant_router.get('/roles/:id', request_handler(GetTenantRolesController));
tenant_router.delete('/removerole/:tenantid/:roleid', request_handler(RemoveTenantRoleController)),
tenant_router.get('/user', request_handler(GetTenantsForUserController))
tenant_router.put('/:id', [json()], request_handler(UpdateTenantController))


module.exports =  tenant_router;