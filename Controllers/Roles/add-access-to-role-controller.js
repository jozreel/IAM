const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const AddAccessToRoleController = ({AddAccessToRole}) => {
    return async req => {
        try {
            const body =  await AddAccessToRole(req);
            return CreateJsonResponse({body});

        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: ex.name === 'RangeError' ? 404: 400});

        }

    }
}
module.exports = AddAccessToRoleController;