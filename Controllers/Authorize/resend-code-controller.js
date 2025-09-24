const { CreateJsonResponse, GetErrorBody } = require("../helpers")

const ResendCodeController = ({ResendCode}) => {
    return async req => {
        try {

            const res =  await ResendCode(req);
            return CreateJsonResponse({body: res, statusCode: 200});

        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}
module.exports =  ResendCodeController;