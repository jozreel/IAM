const { CreateJsonResponse, GetErrorResponse, GetFullJsonResponse } = require("../helpers")

const AddTenantRoleController = ({AddTenantRole}) => {
    return async (req) => {
        try {
            console.log('ROLE')
            const res =  await AddTenantRole(req);
            return GetFullJsonResponse(res);

        } catch(ex) {
            return GetErrorResponse(ex);
        }
    }
}

module.exports = AddTenantRoleController;