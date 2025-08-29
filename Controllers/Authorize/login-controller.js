const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const LoginController = ({Login}) => {
    return async (req) => {
        try {
            console.log('hi')
            const res =  await Login(req);
            return CreateJsonResponse({body: res, statusCode: 201});

        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}

module.exports =  LoginController;