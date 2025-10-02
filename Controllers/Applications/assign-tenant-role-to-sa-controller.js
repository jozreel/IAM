const { GetFullJsonResponse, GetErrorResponse } = require("../helpers");

const AssignTenantRoleToSaController = ({assign_tenantrole_to_serviceaccount}) => {
    return async req => {
        try {
            const res = await assign_tenantrole_to_serviceaccount(req);
            return GetFullJsonResponse(res);
            
        } catch(ex) {
            console.log(ex);
            return GetErrorResponse(ex);
        }
    }
}
module.exports =  AssignTenantRoleToSaController;