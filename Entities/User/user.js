const crypto = require('crypto');
const encryption_key = "b8z9VFNtbQQM0yBODcDb1lrOtVZH3D3x";
const initialization_vector = "A08IFQ5zdCnIqDZA";
const createUserFactory = ({ createUTCDate, verify_token}) => {
    return ({
        email,
        firstname,
        lastname,
        password,
        lastpasswords = [],
        lastpasswordchangedate,
        telephone,
        ADUser =  false,
        applications = [],
        photo,
        status = 0,
        lastcode,
        lastcodecreationtime,
        resetcode,
        resetcodecreationtime,
        createddate = createUTCDate()
    } = {}) => {
        if (!email) {
            throw new Error('Please provide an email')

        }
        const emailre = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (!emailre.test(email)) {
            throw new Error('Invalid email address');
        }
        if (!firstname) {
            throw new Error('Please provide the user\'s first name');
        }
        if (!lastname) {
            throw new Error('Please provide the user\'s last name');
        }
        const telre = /^\+?1?([0-9]{3})?\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        if (!telre.test(telephone)) {
            throw new Error('Invalid telephone number');
        }
 
        const encrypt_password = (text) => {
            const cypher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryption_key), Buffer.from(initialization_vector));
            let pwd_string = cypher.update(text, 'utf8', 'hex')
            pwd_string += cypher.final('hex');
            return pwd_string;
        }

        const decrypt_password = (text) => {
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryption_key), Buffer.from(initialization_vector));
            let dec_text = decipher.update(text, 'hex', 'utf8');
            dec_text += decipher.final('utf8');
            return dec_text;

        }
        
       
        return Object.freeze({
            getEmail: () =>email,
            getFirstName: ()=>firstname,
            getLastName: () => lastname,
            getPassword: ()=> password,
            getLastPasswords: () =>lastpasswords,
            getLastPasswordChangeDate:() => lastpasswordchangedate ? createUTCDate(lastpasswordchangedate) : null,
            getPhoto: () => photo,
            getApplications: () => applications,
            getLastModifiedDate: () => createUTCDate(),
            getCreatedDate: () => createddate,
            getStatus: () => status,
            setPassword: val => password = val,
            setLastPasswords: (val) => lastpasswords = val,
            setLastPasswordChangeDate: date => lastpasswordchangedate =  date,
            decryptPassword: decrypt_password,
            encryptPassword: (pass) => password = encrypt_password(pass),
            isAdUser: ()=> ADUser,
            getTelephone: () => telephone,
            setADUser: () => ADUser =  true,
            verifyToken: (token) => verify_token(process.env.APP_SECRET, token),
            getLastCode: () => lastcode,
            getLastCodeCreationTime:()=>lastcodecreationtime,
            createLastCodeCreatedTime:() => lastcodecreationtime = createUTCDate(),
            getResetCode: ()=> resetcode,
            getResetCodeCreationTime: () => resetcodecreationtime = createUTCDate()
        });

    }
}
module.exports = createUserFactory;