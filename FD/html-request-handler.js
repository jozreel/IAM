//  kwapo labs code.. created by JBL.
const raw_request_handler = (controller) => {
    return  async (req, res) => {
        try {
            const auth_header =  req.headers.authorization;
            let token = '';
            if(auth_header) {
                const auth_header_parts =  auth_header.split(' ');
                const auth_type = auth_header_parts[0].trim();
                if(auth_type.toLowerCase() === 'bearer') {
                    token = auth_header_parts[1].trim();
                }
            }

           
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
                token,
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