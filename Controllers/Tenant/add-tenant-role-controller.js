const { CreateJsonResponse, GetErrorResponse } = require("../helpers")

const AddTenantRoleController = ({AddTenantRole}) => {
    return async (req) => {
        try {
            console.log('ROLE')
            const res =  await AddTenantRole(req);
            return CreateJsonResponse({body: res, statusCode: 200});

        } catch(ex) {
            return GetErrorResponse(ex);
        }
    }
}

module.exports = AddTenantRoleController;