const PostAuthorizeController = ({AuthorizePost}) =>  {
    return async (req) => {
        try {
            const res =  await AuthorizePost(req);
            return {type: res.type, body: res.data, statusCode: 200};

        } catch (ex) {
            console.log(ex);
              
            return CreateJsonResponse({body: GetErrorBody(ex), statusCode: ex.name === 'RangeError' ? 404: 400});
        }
    }
}

module.exports =  PostAuthorizeController;