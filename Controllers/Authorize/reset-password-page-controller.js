const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const ResetPasswordPageController = ({GetResetPasswordPage}) => {
    return (req) => {
        try {
        const res =  GetResetPasswordPage(req);
        return {
            type: 'page',
            body: res,
            statusCode: 200
        }
        } catch (ex) {
            console.log(ex)
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}

module.exports =  ResetPasswordPageController;