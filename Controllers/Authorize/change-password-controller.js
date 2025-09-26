const { CreateJsonResponse, GetErrorBody } = require("../helpers")

const ChangePasswordController = ({ChangePassword}) => {
    return async (req) => {
        try {
          
            const res =  await ChangePassword(req);
            return {type: 'redirect', body: res.data, statusCode: 301, cookies: res.cookies};

        } catch (ex) {
            console.log(ex)
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}
module.exports =  ChangePasswordController;