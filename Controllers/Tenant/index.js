const AddTenantController = require("./add-tenatt-controller");
const {AddTenant, GetAppsFortenant, GetTenantRoles, AddTenantRole, RemoveTenantRole, GetTenantsForUser, UpdateTenant} = require('../../UseCases/Tenant');
const GetAppsForTenantConrtroller = require("./get-apps-for-tenant-controller");
const GetTenantRolesController = require("./get-tenant-roles-controller");
const AddTenantRoleController = require("./add-tenant-role-controller");
const RemoveTenantRoleController = require("./remove-tenant-role-controller");
const GetTenantsForUserController = require("./get-tenants-for-user");
const UpdateTenantController = require("./update-tenant-controller");

module.exports =  Object.freeze({
    AddTenantController: AddTenantController({AddTenant}),
    GetAppsForTenantConrtroller: GetAppsForTenantConrtroller({get_apps_for_tenant: GetAppsFortenant}),
    GetTenantRolesController: GetTenantRolesController({GetTenantRoles}),
    AddTenantRoleController: AddTenantRoleController({AddTenantRole}),
    RemoveTenantRoleController: RemoveTenantRoleController({RemoveTenantRole}),
    GetTenantsForUserController: GetTenantsForUserController({GetTenantsForUser}),
    UpdateTenantController: UpdateTenantController({UpdateTenant})
});