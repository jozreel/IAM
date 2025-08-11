const { CreateJsonResponse, GetErrorBody } = require("../helpers")

const ListRolesController = ({list_roles}) => {
    return async (req) => {
        try {
            const res =  await list_roles(req)
            return CreateJsonResponse({body: res});

        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
            
        }
    }
}
module.exports =  ListRolesController;