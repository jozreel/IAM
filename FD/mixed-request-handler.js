const MixedRequestHandler = (controller) => {
    return async(req, res) => {
        try {
         const httpPayload = {
                body: req.body,
                data: req.body,
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

            if(result.cookie) {
                res.cookie(result.cookiename, result.cookeievalue, result.options);
            }

            if(result.redirect || result.statusCode === 302 || res.statusCode === 301) {
                res.status(result.statusCode).redirect(result.redirect);
            } 
            

            const type = result.type;
            console.log(type)
            if(type === 'page') {
                res.type('html');
                res.set('Content-Type', 'text/html');
                res.status(result.statusCode)
                .send(Buffer.from(result.body));
            } else if(res.type === 'file') {
                res.type('application/octet-stream');
                res.status(result.statusCode)
                result.body.pipe(res);
            } else {
                  res.type('json');
                  res.status(result.statusCode)
                  .send(result.body);
            }
        } else {
            res.send('')
        }
    } catch(ex) {
        console.log(ex);
        res.status(500)

        .send({message: ex.message});
    }
        
    } 
}

module.exports = MixedRequestHandler;