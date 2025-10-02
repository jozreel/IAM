const AddTenant = require("./add-tenent");
const {tenant_db, app_db, role_db, tenant_role_db} = require('../../DataDrivers/MongoDB');
const GetAppsFortenant = require("./get-apps-for-tenant");
const AddTenantRole = require("./add-tenant-role");
const GetTenantRoles = require("./get-tenant-roles");
module.exports =  Object.freeze({
    AddTenant: AddTenant({tenant_db}),
    GetAppsFortenant: GetAppsFortenant({tenant_db}),
    AddTenantRole: AddTenantRole({tenant_db, tenant_role_db}),
    GetTenantRoles: GetTenantRoles({tenant_role_db})
});