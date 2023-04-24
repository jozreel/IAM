const patch_user_controller = ({update_user}) => {
    const headers = {"Content-Type": "application/json"};
    return async (request) => {
        try {
            const data = request.body;
            const id =  request.params.id;
            const result = await update_user(id, data);
            return {
                headers,
                statusCode: 200,
                body: result
            }
        } catch (ex) {
            console.log(ex);
            return {
                headers,
                statusCode: ex.name === 'RangeError' ? 404 : 400,
                body: {message: ex.message}
            }
        }
    }
}
module.exports =  patch_user_controller;