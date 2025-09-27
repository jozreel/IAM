const {Router, json} =  require('express');
const { AddTenantController, GetAppsForTenantConrtroller } = require('../Controllers/Tenant');
const { request_handler } = require('../FD');

const tenant_router = Router();

tenant_router.post('/', json(), request_handler(AddTenantController));
tenant_router.get('/clients/:id', request_handler(GetAppsForTenantConrtroller));

module.exports =  tenant_router;