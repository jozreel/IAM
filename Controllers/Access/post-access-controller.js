const { CreateJsonResponse, GetErrorBody } = require("../helpers")

const PostAccessController = ({AddAccess})=> {
    return async(req) => {
        try {
            const res = await AddAccess(req);
            return CreateJsonResponse({body: res});
        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }

}

module.exports =  PostAccessController;