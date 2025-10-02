const { GetErrorResponse, GetFullJsonResponse } = require("../helpers")

const AddAppRoleController = ({AddAppRole}) => {
    return async req => {
        try {
            const res =  await AddAppRole(req);
            return GetFullJsonResponse(res);

        } catch (ex) {
            return GetErrorResponse(ex);
        }
    }
}

module.exports =  AddAppRoleController;