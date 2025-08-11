const AddRoleController = require("./add-role-controller");
const {AddRole, ListAppRoles, UpdateRole} = require('../../UseCases/Roles');
const ListRolesController = require("./list-roles-controller");
const UpdateRoleController = require("./update-role-controller");
module.exports = Object.freeze({
    AddRoleController: AddRoleController({add_role:AddRole}),
    ListRoleController: ListRolesController({list_roles: ListAppRoles}),
    UpdateRoleController: UpdateRoleController({UpdateRole})
});