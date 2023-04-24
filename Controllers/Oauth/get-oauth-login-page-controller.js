const get_oauth_login_page_controller = ({get_oauth_login_page}) => {
    return async (request) => {
        try {
            const query = request.query;
            const result =  await get_oauth_login_page(query);
           
            return {
                statusCode: 200,
                body: result
            }

        } catch (ex) {
            console.log(ex);
            return {
                statusCode: 400,
                body: {message: ex.message}
            }
        }
    }

}

module.exports = get_oauth_login_page_controller;