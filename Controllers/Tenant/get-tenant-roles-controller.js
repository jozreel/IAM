const { GetErrorBody, GetFullJsonResponse } = require("../helpers")

const GetTenantRolesController = ({GetTenantRoles}) => {
    return async req => {
        try {
           
            const res =  await GetTenantRoles(req);
            
            
            return GetFullJsonResponse(res, 200);

        } catch (ex) {
            console.log('errored')
            return GetErrorBody(ex);
        }
    }
}
module.exports =  GetTenantRolesController;