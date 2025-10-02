const { GetFullJsonResponse, GetErrorResponse } = require("../helpers");

const AssignClientRoleToSaController = ({assign_clientrole_to_serviceaccount}) => {
    return async req => {
        try {
            const res = await assign_clientrole_to_serviceaccount(req);
            return GetFullJsonResponse(res);
            
        } catch(ex) {
            return GetErrorResponse(ex);
        }
    }
}
module.exports =  AssignClientRoleToSaController;