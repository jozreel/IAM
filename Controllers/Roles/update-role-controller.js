const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const UpdateRoleController = ({UpdateRole}) => {
    return async (req) => {
        try {
            const res =  await UpdateRole(req);
            return CreateJsonResponse({body: res});
        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode : ex.name === 'RangeError' ? 404: 400});
        }
    }
}

module.exports =  UpdateRoleController;