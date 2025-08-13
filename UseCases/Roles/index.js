const add_role = require("./add-role");
const {role_db} = require('../../DataDrivers/MongoDB');
const update_role = require("./update-role");
const delete_role = require("./delete-role");
const list_roles = require("./list-roles");
const get_role = require("./get-role");

module.exports = Object.freeze({
    AddRole: add_role({role_db}),
    UpdateRole: update_role({role_db}),
    DeleteRole: delete_role({role_db}),
    ListAppRoles: list_roles({role_db}),
    GetRole: get_role({role_db})
});