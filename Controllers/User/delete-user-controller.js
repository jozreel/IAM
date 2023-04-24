const delete_user_controller = ({delete_user}) => {
    const headers = {"Content-Type": "application/json"};
    return async (request) => {
        try {
            const id = request.params.id;
            const result = await delete_user(id);
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
module.exports =  delete_user_controller;