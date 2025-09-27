const AddTenantController = require("./add-tenatt-controller");
const {AddTenant, GetAppsFortenant} = require('../../UseCases/Tenant');
const GetAppsForTenantConrtroller = require("./get-apps-for-tenant-controller");

module.exports =  Object.freeze({
    AddTenantController: AddTenantController({AddTenant}),
    GetAppsForTenantConrtroller: GetAppsForTenantConrtroller({get_apps_for_tenant: GetAppsFortenant})
});