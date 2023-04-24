const get_profile_pic_controller = ({get_profilepic}) => {

    return async req => {
        try {
            const id = req.params.id;
            const res =  await get_profilepic(id);
            return {
                body: res.file,
                statusCode: 200,
                headers: {'Content-Type': res.type}
            }
        } catch (ex) {
            console.log(ex);
            return {
                body: {message:  ex.message},
                statusCode: ex.name === 'RangeError' ? 404 : 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
    }

}

module.exports =  get_profile_pic_controller;