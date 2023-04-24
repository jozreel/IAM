
const get_oauth_code_controiller = ({get_o_auth_code}) => {
    return async(request) => {
        const headers = {
            "content-type": 'application/json'
        }
        try {
            const query = request.query;

            const res = await get_o_auth_code(query);
            return {
                statusCode: 301,
                redirect: res.redirect_uri,
                body: res

            }

        } catch(ex){
            console.log(ex);
            return {
                statusCode: 500,
                body: {message: ex.message},
                headers
            }
        }
    }
}

module.exports = get_oauth_code_controiller;