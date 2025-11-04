const { GetErrorResponse, GetFullJsonResponse } = require("../helpers")

const AssignRoleToUserController = ({AssignRoleToUser}) => {
    return async req => {
        try {
            const res =  await AssignRoleToUser(req);
            return GetFullJsonResponse(res);

        } catch(ex) {
            return GetErrorResponse(ex);
        }
    }
}
module.exports = AssignRoleToUserController;