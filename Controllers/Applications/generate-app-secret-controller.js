const { CreateJsonResponse, GetErrorBody } = require("../helpers")

const GenerateAppSecretController = ({generate_app_secret}) => {
    return async req => {
        try {
            const res =  await generate_app_secret(req);
            return CreateJsonResponse({body:  res, statusCode: 200});

        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 200});
        }
    }
}

module.exports = GenerateAppSecretController;