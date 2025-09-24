const { CreateJsonResponse, GetErrorBody } = require("../helpers")

const RefreshTokenController = ({TokenService}) => {
    return async (req) => {
        try {
           
            const res =  await TokenService.RefreshToken(req);
            return {
                statusCode: 200,
                cookies: res.cookies,
                body: res.data
            };

        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    } 
}

module.exports =  RefreshTokenController;