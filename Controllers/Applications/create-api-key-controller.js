const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const CreateApiKeyController = ({CreateApiKey}) => {
    return async req => {
        try {
            const body = await CreateApiKey(req);
            return CreateJsonResponse({body});
        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: ex.name = "RangeError" ? 404 : 400});
        }
    }
}
module.exports =  CreateApiKeyController;