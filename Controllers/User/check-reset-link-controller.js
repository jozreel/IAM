const check_reset_link_controller = ({check_reset_link}) => {
    const headers = {"Content-Type": "application/json"};
    return async (request) => {
        try {
            const id =  request.query.uid;
            const code = request.query.code;
            const result = await check_reset_link(id, code);
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
module.exports =  check_reset_link_controller;