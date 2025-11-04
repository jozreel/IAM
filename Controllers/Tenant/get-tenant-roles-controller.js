const { GetErrorBody, GetFullJsonResponse, GetErrorResponse } = require("../helpers")

const GetTenantRolesController = ({GetTenantRoles}) => {
    return async req => {
        try {
           
            const res =  await GetTenantRoles(req);
            
            
            return GetFullJsonResponse(res, 200);

        } catch (ex) {
            
            return GetErrorResponse(ex);
        }
    }
}
module.exports =  GetTenantRolesController;