const proces_code_controller = ({process_code}) => {

    return async req => {
        try {
            const data = req.body;
            data.appid = req.appid;
            const id = req.params.id;
            console.log(req);
            const res  =  await process_code(id, data);
            return {
                body: res,
                statusCode: 200
            }


        } catch (ex) {
            console.log(ex);
            return {
                message: ex.message, statusCode: ex.name === 'RangeError' ? 404: 400
            }
        }
    }
}

module.exports =  proces_code_controller;