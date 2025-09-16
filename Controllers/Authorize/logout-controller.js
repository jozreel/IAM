const { CreateJsonResponse, GetErrorBody } = require("../helpers")

const LogoutController = ({Logout}) => {
    return async (req) => {
        try {
            const res =  await Logout(req);
            return {
                type: res.type, 
                body: res.data,
                clearcookies: res.clearcookies,
                statusCode: 301
            }

        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}

module.exports = LogoutController;