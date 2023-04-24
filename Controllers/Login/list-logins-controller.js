const list_logins_controller = ({list_logins}) => {
    return async (request) => {
        const headers = {"Content-Type": "application/json"};
        try {
            const query =  request.query;
            const result =  await list_logins(query);
            return {
                headers,
                statusCode:200,
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
module.exports = list_logins_controller;