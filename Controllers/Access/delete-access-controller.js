const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const DeleteAccesController =  ({DeleteAccess}) => {
    return async req => {
        try {
            const body = await DeleteAccess(req);
            return CreateJsonResponse({body});
        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: ex.name === 'RangeError' ? 404 : 400});
        }
    }
}
module.exports =  DeleteAccesController;