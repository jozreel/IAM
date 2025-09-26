const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const PasswordInputPageController = ({GetPasswordInput}) => {
    return async (req) => {
        try {
        const res =  await GetPasswordInput(req);
       
        return {
            type: 'page',
            body: res,
            statusCode: 200
        }

    } catch(ex) {
        return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
    }

    }
}

module.exports =  PasswordInputPageController;