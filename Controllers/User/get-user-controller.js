const get_user_controller = ({get_user}) => {
    const headers = {"Content-Type": "application/json"};
    return async (request) => {
        try {
            const id = request.params.id;
            const result = await get_user({id});
            return {
                headers,
                statusCode: 200,
                body: result
            }
        } catch (ex) {
            console.log(ex);
            return {
                headers,
                statusCode: ex.name === 'RangeError' ? 404: 400,
                body: {message: ex.message}
            }
        }
    }
}
module.exports =  get_user_controller;