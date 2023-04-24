const post_application_controller = ({add_app}) => {
    return async (request) => {
        const headers = {"Content-Type": "application/json"};
        try {
            const data =  request.body;
            const result =  await add_app(data);
            return {
                headers,
                statusCode:201,
                body: result
            }

        } catch (ex) {
            console.log(ex);
            return {
                headers,
                statusCode: 400,
                body: {
                     message: ex.message
                }
            }
        }
    }
}
module.exports = post_application_controller;