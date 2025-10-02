const { GetErrorResponse, GetFullJsonResponse } = require("../helpers")

const UnassignSaRoleController = ({unasign_service_account_role}) => {
    return async (req) => {
        try {
            const res =  await unasign_service_account_role(req);
            return GetFullJsonResponse(res, 200);
        } catch (ex) {
            return GetErrorResponse(ex);
        }
    }
}
module.exports =  UnassignSaRoleController;