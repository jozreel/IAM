//  kwapo labs code.. created by JBL.
const raw_request_handler = (controller) => {
    return  async (req, res) => {
        try {
           
            const httpPayload = {
                req, res
            };
           
            const result = await controller(httpPayload);
            if(result) {
            if(result.headers) {
                res.set(result.headers)
            }
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

module.exports =  raw_request_handler;