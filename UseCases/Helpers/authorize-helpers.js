
const crypto = require('crypto');
const AuthorizeHelpers = ({encode_string}) => {
   
  //  const encryption_key = '07b10dbbdd8a68635c5b078f7c72c853d22c12ce64f1be080b834efce0b42f13'
    
    
    const VerifyPkce = (code_verifier, code_challenge, challenge_method) => {
        try {
            const hash = crypto.createHash(challenge_method).update(code_verifier).digest();

            const generated_code_challenge =  encode_string(hash);
            return generated_code_challenge === code_challenge;

        } catch(ex) {
            throw ex;
        }

    }
    


    const encrypt_string = (text) => {
       
        console.log(process.env.SECRET_KEY);
        const encryption_key = process.env.SECRET_KEY;
         const initialization_vector = crypto.randomBytes(16);
        const cypher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryption_key, 'hex'), initialization_vector);
        let pwd_string = cypher.update(text, 'utf8', 'hex')
        pwd_string += cypher.final('hex');
        return initialization_vector.toString('hex')+":"+pwd_string;
    }

    const decrypt_string = (text) => {
        const encryption_key = process.env.SECRET_KEY;
        const parts = text.split(':');
        const iv = Buffer.from(parts.shift(), 'hex');
        const encryptedText = parts.join(':');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryption_key, 'hex'), iv);
        let dec_text = decipher.update(encryptedText, 'hex', 'utf8');
        dec_text += decipher.final('utf8');
        return dec_text;

    }

    const generate_refresh_token = (bytes=32) => {
        const buffer = crypto.randomBytes(bytes);
        const base64String = buffer.toString('base64');
        const base64UrlToken = base64String
        .replace(/\+/g, '-') 
        .replace(/\//g, '_')
        .replace(/=+$/, '');
        return base64UrlToken;
    }

    return Object.freeze({
        VerifyPkce,
        encrypt_string,
        decrypt_string,
        generate_refresh_token
    })
}



module.exports =  AuthorizeHelpers;