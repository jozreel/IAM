const file_request_handler = (controller) => {
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
            console.log(result);
            if(result)  {
            if(result.statusCode !== 200) {
                res.type('application/json');
                res.status(result.statusCode)
                 .send(result.body);
                 return;
            }
            if(result.headers) {
                res.set(result.headers)
            }else {
               res.type('application/octet-stream');
            }
            if(result.headers['Content-Type'] === 'application/json') {
                res.type('application/octet-stream');
            } 
            console.log(result.body);
            res.status(result.statusCode)
            result.body.pipe(res);
        }
        } catch (ex) {
            console.log(ex);
            res.status(500)
            .send({message: ex.message});

        }
    }
}

module.exports = file_request_handler;
