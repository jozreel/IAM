const { GetErrorResponse, GetFullJsonResponse } = require("../helpers")

const GetAssignedSaRolesController = ({GetAssignedSaRoles}) => {
    return async (req) => {
        try {
            const res = await GetAssignedSaRoles(req);
            return GetFullJsonResponse(res);
        } catch (ex) {
            return GetErrorResponse(ex);
        }
    }
}

module.exports =  GetAssignedSaRolesController;