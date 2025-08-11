const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const DeleteRoleController = ({DeleteRole}) => {
    return async (req) => {
        try {
            const body =  await DeleteRole(req);
            return CreateJsonResponse({body});
        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: ex.name === 'RangeError' ? 404 : 400})
        }
    }
}

module.exports = DeleteRoleController;