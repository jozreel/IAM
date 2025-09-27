const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const GetAppsForTenantConrtroller = ({get_apps_for_tenant}) => {
    return async req => {
        try {
            const res =  await get_apps_for_tenant(req);
            return CreateJsonResponse({body: res, statusCode: 200});

        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}
module.exports = GetAppsForTenantConrtroller;