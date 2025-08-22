const crypto = require('crypto');
const secret =  require('../KEYS').secret;
const login_secret =  require('../KEYS').login_secret;
const app_secret =  require('../KEYS').app_secret;
const {makeDB} =  require('../DataDrivers/MongoDB/standalone');
const bcrypt =  require('bcrypt');
const strings = require('../strings');
const MaxKeyLength =  64;
const SaltRounds = 10;

const access_utils_factory = () => {
    const jwt = (payload, secreto) => {
        try {
            const header = {
                alg: 'HS256',
                typ: 'JWT'
            }
           // const encoded_header = encodeURIComponent(Buffer.from(JSON.stringify(header)).toString('base64'));
            let encoded_header = Buffer.from(JSON.stringify(header)).toString('base64');
            encoded_header = url_encode(encoded_header); //encoded_header.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
            let encoded_payload = Buffer.from(JSON.stringify(payload)).toString('base64');
            encoded_payload = url_encode(encoded_payload); //encoded_payload.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
           // const encoded_payload = encodeURIComponent(Buffer.from(JSON.stringify(payload)).toString('base64'));
            const data = `${encoded_header}.${encoded_payload}`;
            const hmac = crypto.createHmac('sha256', secreto);
            hmac.update(data);
            let signature  = hmac.digest('base64');
            signature = url_encode(signature); //signature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
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
                //const calculated_signature = encodeURIComponent(hmac.digest('base64'));
                let calculated_signature = hmac.digest('base64')
               
                calculated_signature = url_encode(calculated_signature);
                 console.log(signature, calculated_signature);
                if(calculated_signature !== signature) {
                    throw new Error('Invalid access token');
                }
                //const headdata = JSON.parse(Buffer.from(decodeURIComponent(header), 'base64').toString('ascii'));
                let header_decoded =  url_decode(header);
                console.log(header_decoded, "MY HEADER")
                const b64bfr =  Buffer.from(header_decoded, 'base64').toString();
                const headdata = JSON.parse(b64bfr);

                let payload_decoded = url_decode(payload);
                const ploadstr =  Buffer.from(payload_decoded, 'base64').toString();
                const payloaddata =  JSON.parse(ploadstr);
                //const payloaddata =  JSON.parse(Buffer.from(decodeURIComponent(payload), 'base64').toString('ascii'));
                return ({payload: payloaddata, header: headdata, signature});
            }

        } catch (ex) {
            console.log(ex)
            throw ex;
        }

    }

   
    const decode_token = (secreto, token) => {

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


    const url_decode = (str, base64=true) => {
        let rstr = str.replace(/-/g, '+').replace(/_/g, '/');
       
        if(base64) {
            while(rstr.length % 4) {
                rstr+='='
            }
        }
        return rstr;
    }


    const url_encode = (str, base64Safe=true) => {
        console.log('ENCODING')
        let resstr = str.replace(/\+/g, '-').replace(/\//g, '_');

        
        if(base64Safe) {
            resstr =  resstr.replace(/=/g, '');
        }

        return resstr;
    }

    const auth_midleware = (req, res, next) => {
        try {
            if(req.method === 'OPTIONS') {
                next();
                return;
            }
             if(req.path === '/api/login') {
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

    const app_api_auth_midleware =  async(req, res, next) => {
        try {
           
           
            const referer = req.get('referer');
            const hostname =  req.hostname;
            if(req.method === 'OPTIONS') {
                next();
                return;
            }
            const token =  req.headers.api;
            console.log(token, referer, hostname);
            if(!token || (!referer && !hostname)) {
                res.status(403);
                res.end('');
                return 403;
            }
            if(token !== '') {
                    let domain;
                    console.log(token)
                    //possibly check in database to see registered apps and api keys
                    const has_access = await verify_api_key({apikey: token}) //verify_token(secret, token);
                  
                    if(referer) {
                        const refurl = new URL(referer);
                        domain = rferurl.host //`${refurl.protocol}//${refurl.host}`;
                    } else {
                        domain =  hostname //`${req.protocol}://${hostname}`
                    }
                    has_access.domain = 'localhost'; // for dev remove on deployment
                    const keydomain = has_access.domain || ['http://localhost','http://localhost:3000',  'http://192.168.1.110', 'http://localhost:3001','https://veppz.com']; //remove this
                    console.log(keydomain, domain);
                    if(has_access && keydomain.indexOf(domain) >=0)  {
                        req.appid =  has_access.app
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

    
    const generate_apikey = () => {
        const buffer =  crypto.randomBytes(Math.ceil(MaxKeyLength / 2));
        return buffer.toString('hex').slice(0, MaxKeyLength);
    }


    const hash_string = async (string) => {
        try {
        
        const salt = await bcrypt.genSalt(SaltRounds);
        
        const hashed_key =  await bcrypt.hash(string, salt);
        return hashed_key;
        } catch (ex) {
            console.error("Could not hash key")
            throw ex;
        }
    }

    const verify_string = async (plain_string, hash_string) => {
        try {
            const res = await bcrypt.compare(plain_string, hash_string);
            return res;

        } catch(ex) {
            console.error('unable to decrypt key');
            return false;
        }
    }


    const verify_api_key =  async (req)  => {
        console.log(req, 'the request')
        const apikey = req.apikey;
        const parts = apikey.split('.');
        if(parts.length  !== 2) {
            throw new Error('Invalid api key');
        }
        const [app, key] =  parts;
        
        const db =  await makeDB();
        const exist =  await db.collection(strings.APP_COLLECTON).findOne({_id: app});
        if(!exist) {
            throw  new Error(`Unable to find the application for this key`);
        }
        const saved_key = exist.apikey;
        const valid =  verify_string(apikey, saved_key);
        if(!valid) {
            throw new Error('Invalid key');
        } else {
            return {app, key, domain: exist.domain};
        }
    
};


    return Object.freeze({
        jwt,
        verify_token,
        app_api_auth_midleware,
        auth_midleware,
        app_key_check,
        cross_origin,
        generate_unique_key,
        generate_apikey,
        hash_string,
        verify_string
    });
}


module.exports =  access_utils_factory;
