const patch_application_controller = ({update_app}) => {
    return async (request) => {
        const headers = {"Content-Type": "application/json"};
        try {
            
            const result =  await update_app(request);
            return {
                headers,
                statusCode:200,
                body: result
            }

        } catch (ex) {
            console.log(ex);
            return {
                headers,
                statusCode: ex.name === 'RangeError'? 404 : 400,
                body: {
                     message: ex.message
                }
            }
        }
    }
}
module.exports = patch_application_controller;