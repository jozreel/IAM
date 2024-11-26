const https =  require('https');
class HttpClient { 
 
 static async HttpsGetRequest({host, path, port, headers, encoding='utf8'}) {
    try {
        const options = {
            host,
            headers,
            path,
            port
        }
       
        let error;
        let contenttype;
        return new Promise((resolve, reject) => {
            https.get(options,  (res) => {
                contenttype =  res.headers['content-type'];
                const {statusCode} =  res;
                
                if (statusCode !== 200 && statusCode !== 204 && statusCode !== 201 && statusCode !== 302) {
                    error =  new Error(`Request Failed Status Code: ${statusCode}`);
                    res.resume()
                    reject(error);
                    return;
                }
                if(res.headers.location && statusCode === 302) {
                    res.redirect(statusCode, res.headers.location);
                    
                   /* const urlparts =  new URL(res.headers.location)
                    const res = await HttpsGetRequest({
                        host: urlparts.host,
                        headers
                    });*/
                }

                res.setEncoding(encoding);
                let data  = '';
                res.on('data', (chunk) => {
                  
                    data+= chunk;
                });
                res.on('end', () =>{
                    if (/^application\/json/.test(contenttype)) {
                    try {
                        const resdata =  JSON.parse(data);
                        resolve(resdata);
                    } catch (ex) {
                        reject(ex);
                    }
                } else {
                    
                    resolve(data);
                }
                });
            }).on('error', (err) => {
                reject(err);
            });

        
            
        })

    } catch(ex) {
        throw ex;
    }

}

static async HttpsRequest({host, path, port, headers, method, reqdata, encoding='utf8'}){
    try {
        const options = {
            host,
            headers,
            path,
            port,
            method
           
        }

       
        const isjson = /^application\/json/i.test(headers['Content-Type']);

       
       if(reqdata) {
            headers['Content-Length'] = /^application\/json/.test(headers['Content-Type']) ? Buffer.byteLength(JSON.stringify(reqdata)): Buffer.byteLength(reqdata);
       } 
        let error;
        let contenttype;
        return new Promise((resolve, reject) => {
            
            const req = https.request(options, (res) => {
                
                contenttype =  res.headers['content-type'];
                const {statusCode, statusMessage} =  res;
               
               
                if (statusCode !== 200  && statusCode !== 204 && statusCode !== 202 && statusCode !== 201 && statusCode !== 302) {
                    
                    error =  new Error(`Request Failed Status Code: ${statusCode}`);
                    res.resume()
                    //reject(error);
                    //return;
                }
                
                res.setEncoding(encoding);
                let data  = '';
                res.on('data', (chunk) => {
                    
                    data+= chunk;
                });
                res.on('end', () =>{
                    if(statusCode !== 200 && statusCode !== 202 && statusCode !== 204 && statusCode !== 201 && statusCode !== 302) {
                        if(data.trim().length === 0) {
                            reject('Request error');
                            return;
                        }
                        if (/^application\/json/.test(contenttype)) {
                            try {
                               
                                const resdata =  JSON.parse(data);
                            
                                reject(resdata);
                                return;
                            } catch (ex) {
                                reject(ex);
                                return;
                            }
                        } else {
                            reject(data||error);
                            return;
                        }
                    } else {
                    if (/^application\/json/.test(contenttype)) {
                    try {
                        const resdata =  JSON.parse(data);
                        resolve(resdata);
                    } catch (ex) {
                        reject(ex);
                        return;
                    }
                } else {
                    resolve(data);
                }
                }
                });
               
            })
           
            req.on('error', (err) => {
                console.log(err, 'error');
                reject(err);
                return;
            });
            if(reqdata){
            req.write(isjson ? JSON.stringify(reqdata): reqdata);
            }
            req.end();

        
            
        })

    } catch(ex) {
        throw ex;
    }

}
}

module.exports = HttpClient;


