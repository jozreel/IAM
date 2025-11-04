const {GetFullJsonResponse, GetErrorBody, GetErrorResponse} = require('../helpers')
const GetTenantsForUserController = ({GetTenantsForUser}) => {
    return async (req) => {
        try {
            const res =  await GetTenantsForUser(req);
            return GetFullJsonResponse(res);
        } catch(ex) {
            return GetErrorResponse(ex);
        }
    }
}

module.exports =  GetTenantsForUserController;