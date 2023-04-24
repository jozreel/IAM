const get_auth_controller = ({get_auth}) => {
    return async (httpPayload) => {
        const headers = {"Content-Type": "application/json"};
        try {
            const result =  await get_auth(httpPayload.req, httpPayload.res);
            if(result) {
            return {
                headers,
                statusCode: 200,
                body: result
            }
        }

        } catch (ex) {
            console.log(ex);
            return {
                headers,
                statusCode: ex.name === 'RangeError' ? 401 : 403,
                body: {message: ex.message}
            }
        }
    }
}

module.exports =  get_auth_controller;