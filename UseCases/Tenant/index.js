const AddTenant = require("./add-tenent");
const {tenant_db, app_db} = require('../../DataDrivers/MongoDB');
const GetAppsFortenant = require("./get-apps-for-tenant");
module.exports =  Object.freeze({
    AddTenant: AddTenant({tenant_db}),
    GetAppsFortenant: GetAppsFortenant({tenant_db})
});