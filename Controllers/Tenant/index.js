const AddTenantController = require("./add-tenatt-controller");
const {AddTenant, GetAppsFortenant, GetTenantRoles, AddTenantRole} = require('../../UseCases/Tenant');
const GetAppsForTenantConrtroller = require("./get-apps-for-tenant-controller");
const GetTenantRolesController = require("./get-tenant-roles-controller");
const AddTenantRoleController = require("./add-tenant-role-controller");

module.exports =  Object.freeze({
    AddTenantController: AddTenantController({AddTenant}),
    GetAppsForTenantConrtroller: GetAppsForTenantConrtroller({get_apps_for_tenant: GetAppsFortenant}),
    GetTenantRolesController: GetTenantRolesController({GetTenantRoles}),
    AddTenantRoleController: AddTenantRoleController({AddTenantRole})
});