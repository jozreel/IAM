 const  {CreateJsonResponse, GetErrorBody} = require('../helpers');
const AddTokenController = ({TokenService}) => {
    return async (req) => {
        try {
            const res =  await TokenService.AddToken(req);
              return {statusCode: 200, body: res.data, cookies: res.cookies}

        } catch(ex) {
            console.log(ex);
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400})
        }
    }
}

module.exports =  AddTokenController;