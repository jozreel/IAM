const delete_application_controller = ({delete_app}) => {
    return async (request) => {
        const headers = {"Content-Type": "application/json"};
        try {
            const id =  request.params.id;
            const result =  await delete_app(id);
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
module.exports = delete_application_controller;