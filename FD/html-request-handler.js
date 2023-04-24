//  kwapo labs code.. created by JBL.
const raw_request_handler = (controller) => {
    return  async (req, res) => {
        try {
           
            const httpPayload = {
                body: req.body,
                query: req.query,
                file: req.file,
                params: req.params,
                ip: req.ip,
                method: req.method,
                access: req.access,
                path: req.path,
                appid: req.appid,
                headers: {
                    'Content-Type': req.get('Content-Type'),
                    'Referer': req.get('referer'),
                    'User-Agent': req.get('User-Agent')
                }
               
            };
            const result = await controller(httpPayload);
            if(result) {
            if(result.headers) {
                res.set(result.headers)
            }
            res.type('html');
            res.status(result.statusCode)
            .send(result.body);
        }
        } catch (ex) {
            console.log(ex);
            res.status(500)
            .send({message: ex.message});

        }
    }
}

module.exports =  raw_request_handler;