const { GetErrorResponse, GetFullJsonResponse } = require("../helpers")

const RemoveAppRoleController = ({RemoveAppRole}) => {
    return async req => {
        try {
            const res = await RemoveAppRole(req);
            return GetFullJsonResponse(res);

        } catch (ex) {
            return GetErrorResponse(ex);
        }
    }
}
module.exports = RemoveAppRoleController;