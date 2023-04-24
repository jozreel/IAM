const get_application_controller = ({get_app}) => {
    return async (request) => {
        const headers = {"Content-Type": "application/json"};
        try {
            const id =  request.params.id;
            const result =  await get_app(id);
            return {
                headers,
                statusCode:200,
                body: result
            }

        } catch (ex) {
            console.log(ex);
            return {
                headers,
                statusCode: ex.name === 'RangeError' ? 404 : 400,
                body: {
                     message: ex.message
                }
            }
        }
    }
}
module.exports = get_application_controller;