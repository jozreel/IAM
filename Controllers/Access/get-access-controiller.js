const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const GetAccessController = ({GetAccess}) => {
    return async req => {
        try {
            const body = await GetAccess(req);
            return CreateJsonResponse({body});
        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: ex.name === "RangeError" ? 404 : 400});
        }
    }
}

module.exports =  GetAccessController;