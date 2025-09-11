
const crypto = require('crypto');
const AuthorizeHelpers = ({encode_string}) => {

    const VerifyPkce = (code_verifier, code_challenge, challenge_method) => {
        try {
            const hash = crypto.createHash(challenge_method).update(code_verifier).digest();

            const generated_code_challenge =  endode_string(hash);
            return generated_code_challenge === code_challenge;

        } catch(ex) {
            throw ex;
        }

    }

    return Object.freeze({
        VerifyPkce
    })
}


module.exports =  AuthorizeHelpers;