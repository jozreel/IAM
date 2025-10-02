const db =  require('../../DataDrivers/MongoDB');
const add_app =  require('./add-application');
const update_app = require('./update-application');
const get_app =  require('./get-application');
const list_apps =  require('./list-applications');
const delete_app =  require('./delete-application');
const create_api_key = require('./create-api-key');
const verify_api_key = require('./verify-apikey');
const GenerateAppSecret = require('./genarate-app-secret');
const AddAppRole = require('./add-app-role');
const AssignTenantRoleToServiceAccount = require('./assign-tenantrole-to-serviceaccount');
const AssignClientRoleToServiceAccount = require('./assign-clientrole-to-serviceaccount');
const UnassignServiceAccountRole = require('./unassign-serviceaccount-role');

const {verify_token, generate_unique_key, hash_string} =  require('../../FD').access_utils;
const app_db =  db.app_db;
const user_db =  db.user_db;
const role_db =  db.role_db;
const access_db = db.access_db;
const serviceaccount_roles_db =  db.serviceaccount_role_db

module.exports = {
    add_app: add_app({app_db, encrypt_string: hash_string}),
    update_app: update_app({app_db,user_db, role_db, access_db, generate_unique_key, encrypt_string: hash_string}),
    get_app: get_app({app_db}),
    list_apps: list_apps({app_db, verify_token, generate_unique_key}),
    delete_app: delete_app({app_db}),
    create_api_key: create_api_key({app_db}),
    verify_app_key: verify_api_key({app_db}),
    generate_app_secret: GenerateAppSecret({app_db}),
    add_app_role: AddAppRole({app_db, role_db}),
    assign_ckient_role_to_service_account: AssignClientRoleToServiceAccount({serviceaccount_roles_db, role_db, app_db}),
    assign_tenant_role_to_service_account: AssignTenantRoleToServiceAccount({serviceaccount_roles_db, app_db, tenant_role_db: db.tenant_role_db}),
    unassign_serviceaccount_role: UnassignServiceAccountRole({app_db, serviceaccount_roles_db})
};