const secret = require('../../KEYS').login_secret;
const createLoginFactory = ({createUTCDate, createToken}) => {
    return ({
        uid, 
        createddate=createUTCDate(),
        appid,
        ip,
        code,
        responsetype='code',
        state,
        success = false,
        multifactorcode     
    } = {}) => {
        if(!uid) {
            throw new Error('Invalid user. Trya again');
        }
        if(!appid) {
            throw new Error('iInvalid Application. Contact administrator')
        }

        if(responsetype === 'code' && !code) {
            throw new Error('No code supplied');
        }


        return Object.freeze({
            getUID: () => uid,
            getAppID:() => appid,
            getCreatedDate: () => createddate,
            getIP: () => ip,
            isSuccessfull: () =>success,
            getResponseType: () => responsetype,
            getState: () => state,
            getCode: () => code,
            setSuccess: (val) => success =  val,
            getMultiFactorCode: () => multifactorcode,
            createToken: (payload)=> createToken(payload, secret)
        });
    }
}
module.exports =  createLoginFactory;