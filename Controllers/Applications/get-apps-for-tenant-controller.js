const { GetErrorResponse, GetFullJsonResponse } = require("../helpers")

const GetAppsForTenantConrtroller = ({GetAppsFrTenant}) => {
    return async req => {
        try {
            const res = await GetAppsFrTenant(req);
            return GetFullJsonResponse(res);
        } catch(ex) {
            return GetErrorResponse(ex);
        }
    }
}
module.exports =  GetAppsForTenantConrtroller;