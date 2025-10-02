const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const AddTenantController = ({AddTenant}) => {
    return async  req => {
        try {
            console.log('adding tenant')
            const res =  await AddTenant(req);
            return CreateJsonResponse({body: res, statusCode:  201});
            
        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}

module.exports =  AddTenantController;