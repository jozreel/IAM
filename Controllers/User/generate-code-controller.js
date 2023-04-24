const generate_code_controller = ({generate_code}) => {
    const headers = {"Content-Type": "application/json"};
    return async (request) => {
        try {
            const data = request.body;
            const id =  request.params.id;
            const result = await generate_code(id);
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
module.exports =  generate_code_controller;