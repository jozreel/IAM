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
                credentials: req.headers.authorization,
                path: req.path,
                appid: req.appid,
                cookies: req.cookies,
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
            if(result.statusCode) {
                res.status(res.statusCode);
            }

            if(result.cookies) {
                result.cookies.forEach(c => res.cookie(c.name, c.value, c.options));
            }
            if(result.clearcookies) {
                 result.clearcookies.forEach(c => res.clearCookie(c.name, c.options));
            }

            if(result.redirect && (result.statusCode === 302 || res.statusCode === 301)) {
                res.status(result.statusCode).redirect(result.redirect);
            } 
            

            const type = result.type;
          
            if(type === 'page') {
                res.type('html');
                res.set('Content-Type', 'text/html');
                res.status(result.statusCode)
                .send(Buffer.from(result.body));
            } else if(type === 'file') {
                res.type('application/octet-stream');
                res.status(result.statusCode)
                result.body.pipe(res);
            } else if(type === 'redirect') {
                res.redirect(result.body.url);
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