const save_profile_pic_controller = ({save_profile_pic}) => {
    return async (request) => {
        const headers = {"Content-Type": "application/json"};
        try {

            const id = request.params.id;
            console.log(request);
            const data = request.file;
            console.log(data);
            const res = await save_profile_pic(id, data);

            return {
                body:  res,
                headers,
                statusCode:200
            }
        } catch (ex) {
            console.log(ex);
            return {
                body: {message: ex.massage},
                headers,
                statusCode: ex.name === 'RangeError' ? 404 : 400
            }
        }
    }
}

module.exports =  save_profile_pic_controller;