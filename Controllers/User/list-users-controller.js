const list_users_controller = ({list_users, get_user}) => {
    const headers = {"Content-Type": "application/json"};
    return async (request) => {
        try {
            const query = request.query;
            query.access =  request.access;
            let result = [];
            if(Object.keys(query).length === 2 && Object.keys(query).includes('email')) {
                result =  await get_user({email: query.email});
            } else {
                result = await list_users(query);
            }
            return {
                headers,
                statusCode: 200,
                body: result
            }
        } catch (ex) {
            console.log(ex, ex.name);
            return {
                headers,
                statusCode: ex.name === 'RangeError' ? 404 : 400,
                body: {message: ex.message}
            }
        }
    }
}
module.exports =  list_users_controller;