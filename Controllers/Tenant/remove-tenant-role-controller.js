const { GetErrorResponse, GetFullJsonResponse } = require("../helpers")

const RemoveTenantRoleController = ({RemoveTenantRole}) => {
    return async(req) => {
        try {
            const res =  await RemoveTenantRole(req);
            return GetFullJsonResponse(res, 200);

        } catch(ex) {
            return GetErrorResponse(ex);
        }
    }
}

module.exports =  RemoveTenantRoleController;