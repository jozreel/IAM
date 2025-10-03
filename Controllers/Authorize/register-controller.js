const { CreateJsonResponse, GetErrorBody } = require("../helpers")

const RegisterController = ({Register}) => {
    return async (req) => {
        try {
            const res = await Register(req);
           
            return res.type === 'json' ? {
                type: res.type,
                body: res.data,
                statusCode: 200
            } :  {
                type: 'redirect',
                body: {
                    url: res.data.url
                },
                
                statusCode: 301
            };
             
        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}


module.exports =  RegisterController;