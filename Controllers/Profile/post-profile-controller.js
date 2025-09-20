const {CreateJsonResponse, GetErrorBody} = require('../helpers');
const PostProfileController = ({GetProfilePost}) => {
    return async (req) => {
        try {

          
            const res =  await GetProfilePost(req);
            
            return CreateJsonResponse({body: res, statusCode: 200});
        } catch(ex) {
            console.log(ex);
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: 400});
        }
    }
}

module.exports =  PostProfileController;