//  kwapo labs code.. created by JBL.
const http_request_handler = (controller) => {
    return  async (req, res) => {
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
                cookies: req.cookies,
                credentials: req.headers.authorization,
                headers: {
                    'Content-Type': req.get('Content-Type'),
                    'Referer': req.get('referer'),
                    'User-Agent': req.get('User-Agent')
                }
               
            };
           
            const result = await controller(httpPayload);
             
            if(result.headers) {
                res.set(result.headers)
            }
            if(result.cookies) {
                result.cookies.forEach(c => res.cookie(c.name, c.value, c.options));
            }
            if(result.clearcookies) {
                 result.clearcookies.forEach(c => res.clearCookie(c.name, c.options));
            }
            if(result.redirect || result.statusCode === 301) {
                res.status(result.statusCode).redirect(result.redirect);


            } else {

            
            res.type('json');
            
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

module.exports =  http_request_handler;