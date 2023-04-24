const secret = require('../../KEYS').login_secret;
const createLoginFactory = ({createUTCDate, createToken}) => {
    return ({
        uid, 
        createddate=createUTCDate(),
        appid,
        ip,
        success = false        
    } = {}) => {
        if(!uid) {
            throw new Error('Invalid user. Trya again');
        }
        if(!appid) {
            throw new Error('iInvalid Application. Contact administrator')
        }
        return Object.freeze({
            getUID: () => uid,
            getAppID:() => appid,
            getCreatedDate: () => createddate,
            getIP: () => ip,
            isSuccessfull: () =>success,
            setSuccess: (val) => success =  val,
            createToken: (payload)=> createToken(payload, secret)
        });
    }
}
module.exports =  createLoginFactory;