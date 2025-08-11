const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const GetRoleController = ({GetRole}) => {
    return async (req) => {
        try {
            const body =  await GetRole(req);
            return CreateJsonResponse({body});
        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: ex.name === 'RangeError' ? 404 : 400});
        }
    }
}

module.exports =  GetRoleController;