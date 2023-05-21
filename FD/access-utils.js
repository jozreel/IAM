const crypto = require('crypto');
const secret =  require('../KEYS').secret;
const login_secret =  require('../KEYS').login_secret;
const app_secret =  require('../KEYS').app_secret;
const access_utils_factory = () => {
    const jwt = (payload, secreto) => {
        try {
            const header = {
                alg: 'HS256',
                typ: 'JWT'
            }
            const encoded_header = encodeURIComponent(Buffer.from(JSON.stringify(header)).toString('base64'));
            const encoded_payload = encodeURIComponent(Buffer.from(JSON.stringify(payload)).toString('base64'));
            const data = `${encoded_header}.${encoded_payload}`;
            const hmac = crypto.createHmac('sha256', secreto);
            hmac.update(data);
            const signature = encodeURIComponent(hmac.digest('base64'));
            return `${data}.${signature}`;
        } catch (ex) {
            throw ex;
        }
    }

    const verify_token = (secreto, token) => {

        try {
            const token_parts = token.split('.');
            if(token_parts.length === 3) {
                const header =  token_parts[0];
                const payload = token_parts[1];
                const signature =  token_parts[2];
                const data = `${header}.${payload}`;
                const hmac =  crypto.createHmac('sha256', secreto);
                hmac.update(data);
                const calculated_signature = encodeURIComponent(hmac.digest('base64'));
                if(calculated_signature !== signature) {
                    throw new Error('Invalid access token');
                }
                const headdata = JSON.parse(Buffer.from(decodeURIComponent(header), 'base64').toString('ascii'));
                const payloaddata =  JSON.parse(Buffer.from(decodeURIComponent(payload), 'base64').toString('ascii'));
                return ({payload: payloaddata, header: headdata, signature});
            }

        } catch (ex) {
            throw ex;
        }

    }

    const auth_midleware = (req, res, next) => {
        try {
            if(req.method === 'OPTIONS') {
                next();
                return;
            }
            const auth_header =  req.headers.authorization;
           
            const auth_header_parts =  auth_header.split(' ');
          
            if(auth_header_parts.length <= 1) {
               
                res.status(401);
                res.end('');
                return 401;
            }
            const auth_type = auth_header_parts[0].trim();
            if(auth_type.toLowerCase() === 'bearer') {
                const token = auth_header_parts[1].trim();
                if(token !== '') {
                    console.log(token);
                    const has_access = verify_token(login_secret, token);
                    
                    req.access = has_access.payload;
                    next();
                } else{
                   
                    res.status(401);
                    res.end('');
                    return 401;
                }
            }


        } catch (ex) {
            res.status(401);
            res.end('');
            return 401;
        }
    }

    const app_api_auth_midleware = (req, res, next) => {
        try {
            const referer = req.get('referer');
            const hostname =  req.hostname;
            if(req.method === 'OPTIONS') {
                next();
                return;
            }
            const token =  req.headers.api;
           
            if(!token || (!referer && !hostname)) {
                res.status(403);
                res.end('');
                return 403;
            }
            if(token !== '') {
                    let domain;
                    const has_access = verify_token(secret, token);
                    if(referer) {
                    const refurl = new URL(referer);
                    domain =  `${refurl.protocol}//${refurl.host}`;
                    } else {
                        domain =  `${req.protocol}://${hostname}`
                    }
                    const keydomain = has_access.payload.domain || ['http://localhost','http://localhost:3000', 'http://192.168.1.110']; //remove this
                    console.log(domain, keydomain);
                    if(has_access && keydomain.indexOf(domain) >=0)  {
                        req.appid =  has_access.payload.app
                    next();
                    } else {
                       
                        res.status(403);
                        res.end('');
                        return 403;
                    }
                } else{
                    
                    res.status(403);
                    res.end('');
                    return 403;
                }
            
        } catch (ex) {
            console.log(ex);
            res.status(403);
            res.end('');
            return 403;
        }
    }

    const app_key_check = (req, res, token) => {
        try {
            if(req.method === 'OPTIONS') {
                next();
                return;
            }
            if(!token) {
                res.status(403);
                res.end('');
                return 403;
            }
            if(token !== '') {
                    
                    const has_access = verify_token(app_secret, token);
                    if(has_access) {
                        req.appid =  has_access.payload.app
                        return has_access.payload;
                    } else {
                        res.status(403);
                        res.end('');
                        return 403;
                    }
                } else{
                    res.status(403);
                    res.end('');
                    return 403;
                }
            
        } catch (ex) {
            console.log(ex);
            res.status(403);
            res.end('');
            return 403;
        }
    }

    const cross_origin = (req, res, next) => {
        const allowed = ['http://localhost:4200', 'http://localhost:3371', 'http://10.10.0.121:3369', 'http://prod.liat.loc'];
        const origin = req.headers.origin;
       
        if (allowed.indexOf(origin) >= 0) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, api, Authorization, x-auth-token');
        next();

    }


    const generate_unique_key = () => {
        try {
            const rand = crypto.randomBytes(32);
            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let str = ''
            for (let i=0; i<rand.length; i++) {
                let ind = rand[i] % chars.length;
                str+= chars[ind];

            }
            
            return str
            

        } catch (ex) {
            throw ex;
        }
    }


    return Object.freeze({
        jwt,
        verify_token,
        app_api_auth_midleware,
        auth_midleware,
        app_key_check,
        cross_origin,
        generate_unique_key
    });
}
module.exports =  access_utils_factory;
