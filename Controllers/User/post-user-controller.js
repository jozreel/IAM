const post_user_controller = ({add_user}) => {
    const headers = {"Content-Type": "application/json"};
    return async (request) => {
        try {
            const data = request.body;
            const result = await add_user(data);
            return {
                headers,
                statusCode: 201,
                body: result
            }
        } catch (ex) {
            console.log(ex);
            return {
                headers,
                statusCode: 400,
                body: {message: ex.message}
            }
        }
    }
}
module.exports =  post_user_controller;