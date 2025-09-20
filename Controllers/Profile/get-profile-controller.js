const {CreateJsonResponse, GetErrorBody} = require('../helpers');
const GetProfileController = ({GetProfile}) => {
    return async (req) => {
        try {

            const res =  await GetProfile(req);
            return CreateJsonResponse({body: res, statusCode: 200});
        } catch(ex) {
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}

module.exports =  GetProfileController;