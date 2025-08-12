const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const ListaccessController = ({ListAccess}) => {
    return async req => {
        try {
            const body =  await ListAccess(req);
            return CreateJsonResponse({body});
        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex) , statusCode: 400});
        }
    }
}
module.exports = ListaccessController;