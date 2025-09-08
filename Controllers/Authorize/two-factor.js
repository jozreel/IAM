const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const TwoFactorController = ({TwoFactor}) => {
    return async (req) => {
        try {
            const res = await TwoFactor(req);
            console.log(res);
            return {type: res.type, body: res.data};

        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}

module.exports =  TwoFactorController;