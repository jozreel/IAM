const generate_reset_link_controller = ({generate_reset_link}) => {
    const headers = {"Content-Type": "application/json"};
    return async (request) => {
        try {
            const data = request.body;
            const id =  request.params.id;
            const result = await generate_reset_link(id, data);
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
module.exports =  generate_reset_link_controller;