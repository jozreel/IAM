const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const RemoveAccessFromRoleController = ({RemoveAccessFromRole}) => {
    return async req => {
        try {
            const body =  await RemoveAccessFromRole(req);
            return CreateJsonResponse({body});

        } catch (ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: ex.name === 'RangeError' ? 404: 400});

        }

    }
}
module.exports = RemoveAccessFromRoleController;