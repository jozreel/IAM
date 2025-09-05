const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const TwoFactorController = ({TwoFactor}) => {
    return async (req) => {
        try {
            const res = await TwoFactor(req);
            return CreateJsonResponse({bodu: res, statusCode: 200});

        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}

module.exports =  TwoFactorController;