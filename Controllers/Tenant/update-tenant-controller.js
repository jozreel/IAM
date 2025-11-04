const { GetFullJsonResponse, GetErrorResponse } = require("../helpers");

const UpdateTenantController = ({UpdateTenant}) => {
    return async req => {
        try {
            const res =  await UpdateTenant(req);
            return GetFullJsonResponse(res);

        } catch(ex) {
            return GetErrorResponse(ex);
        }
    }
}
module.exports =  UpdateTenantController;