const AddTenant = require("./add-tenent");
const {tenant_db, app_db, role_db, tenant_role_db, user_db} = require('../../DataDrivers/MongoDB');
const GetAppsFortenant = require("./get-apps-for-tenant");
const AddTenantRole = require("./add-tenant-role");
const GetTenantRoles = require("./get-tenant-roles");
const RemoveTenantRole = require("./remove-tenent-role");
const GetTenantsForUser = require("./get-tenants-form-user");
const {security_helpers} =  require('../Helpers');
const UpdateTenant = require("./update-tenant");
module.exports =  Object.freeze({
    AddTenant: AddTenant({tenant_db}),
    GetAppsFortenant: GetAppsFortenant({tenant_db}),
    AddTenantRole: AddTenantRole({tenant_db, tenant_role_db}),
    GetTenantRoles: GetTenantRoles({tenant_role_db}),
    RemoveTenantRole: RemoveTenantRole({tenant_role_db, tenant_db, user_db, app_db}),
    GetTenantsForUser: GetTenantsForUser({tenant_db, check_has_role_by_name: security_helpers.check_has_role_by_name}),
    UpdateTenant: UpdateTenant({tenant_db, check_has_role_by_name: security_helpers.check_has_role_by_name})
});