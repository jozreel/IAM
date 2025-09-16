const { CreateJsonResponse, GetErrorBody } = require("../helpers")

const ConsentController =  ({Consent}) => {
    return async req => {
        try {
            const res =  await Consent(req);

            return {type: res.type, body: res.data, statusCode: res.type === 'redirect' ? 301 : 200}

        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}

module.exports =  ConsentController;