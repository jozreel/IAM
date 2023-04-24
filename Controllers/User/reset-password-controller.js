const reset_password_controller = ({reset_password}) => {
    const headers = {"Content-Type": "application/json"};
    return async (request) => {
        try {
            const data = request.body;
            const id =  request.params.id;
            const result = await reset_password(id, data);
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
module.exports =  reset_password_controller;