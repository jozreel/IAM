const AddRoleController = require("./add-role-controller");
const {AddRole, ListAppRoles, UpdateRole, DeleteRole, GetRole, RemoveAccessFromRole, AddAccessToRole} = require('../../UseCases/Roles');
const ListRolesController = require("./list-roles-controller");
const UpdateRoleController = require("./update-role-controller");
const DeleteRoleController = require("./delete-role-controller");
const GetRoleController = require("./get-role-controller");
const RemoveAccessFromRoleController = require("./remove-access-from-role-controller");
const AddAccessToRoleController = require("./add-access-to-role-controller");
module.exports = Object.freeze({
    AddRoleController: AddRoleController({add_role:AddRole}),
    ListRoleController: ListRolesController({list_roles: ListAppRoles}),
    UpdateRoleController: UpdateRoleController({UpdateRole}),
    DeleteRoleController: DeleteRoleController({DeleteRole}),
    GetRoleController: GetRoleController({GetRole}),
    RemoveAccessFromRoleController: RemoveAccessFromRoleController({RemoveAccessFromRole}),
    AddAccessToRoleController: AddAccessToRoleController({AddAccessToRole})
});