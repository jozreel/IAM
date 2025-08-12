const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const PutAccessController = ({UpdateAccess}) => {
    return async req => {
        try {
            const body = await UpdateAccess(req);
            return CreateJsonResponse({body});
        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: ex.name = "RangeError" ? 404 : 400});
        }
    }
}
module.exports =  PutAccessController;