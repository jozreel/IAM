const crypto = require('crypto');
const encryption_key = "b8z9VFNtbQQM0yBODcDb1lrOtVZH3D3x";
const initialization_vector = "A08IFQ5zdCnIqDZA";
const createUserFactory = ({ createUTCDate, verify_token}) => {
    const maxemail =  80;
    const maf_fiorstname = 80;
    const max_lastname = 80;
    const maxpassword =  16;
    const max_tel = 11;
    return ({
        id,
        email,
        username,
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
        createddate =createUTCDate(),
        lastmodifieddate
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
        if(email && email.length > maxemail) {
            throw new Exception(`Email max lenght is ${maxemail}`);
        }
        if(firstname && firstname.length > maf_fiorstname) {
            throw new Error(`First nam has a max length of ${maf_fiorstname}`);
        }
        if(lastname && firstname.length > max_lastname) {
            throw new Error(`Lastname has a max length of ${max_lastname}`)
        }

        if(!id && password && password.length >   maxpassword) {
            throw new Error(`Password has a max length of ${maxpassword}`);
        }

        if(telephone && telephone.length > max_tel) {
            throw new Error(`Telephone has a max length of ${max_tel}`);
        }

        if(!username) {
            throw  new Error("Please provide a username")
        }

        //do regex to validate username

        if(username && username.length < 8) {
            throw new Error('Username must be a min length of 8 characters');
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
            getId: ()=> id,
            getEmail: () =>email,
            getFirstName: ()=>firstname,
            getLastName: () => lastname,
            getPassword: ()=> password,
            getUsername: () => username,
            getLastPasswords: () =>lastpasswords,
            getLastPasswordChangeDate:() => lastpasswordchangedate ? createUTCDate(lastpasswordchangedate) : null,
            getPhoto: () => photo,
            getApplications: () => applications,
            getLastModifiedDate: () => lastmodifieddate ? lastmodifieddate : createUTCDate(),
            getCreatedDate: () => createddate ? createddate : createUTCDate(),
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
            getResetCodeCreationTime: () => resetcodecreationtime = createUTCDate(),
            ToJson: ()=>({
                id,
                email,
                telephone,
                username,
                firstname,
                lastname,
                password,
                lastpasswords: lastpasswords,
                lastpasswordchangedate,
                photo,
                applications,
                createddate,
                lastmodifieddate,
                status,
                ADUser,
                lastcode,
                lastcodecreationtime
            })
        });

    }
}
module.exports = createUserFactory;