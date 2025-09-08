const post_login_controller = ({add_login}) => {
    return async (request) => {
        const headers = {"Content-Type": "application/json"};
        try {
              ////todo
            // get apid from api token
            const data =  request.body;
            data.serverip =  request.ip;
            if(!data.appid) data.appid = request.appid;
            const referer = request.headers["Referer"];
            console.log(referer);
            const result =  await add_login(data);
            return {
                headers,
                statusCode:201,
                body: result
            }

        } catch (ex) {
            console.log(ex);
            return {
                headers,
                statusCode: 400,
                body: {
                     message: ex.message
                }
            }
        }
    }
}
module.exports = post_login_controller;