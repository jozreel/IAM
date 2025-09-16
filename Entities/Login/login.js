const secret = require('../../KEYS').login_secret;
const createLoginFactory = ({createUTCDate, createToken}) => {
    return ({
        uid, 
        createddate=createUTCDate(),
        appid,
        ip,
        code,
        codecreationtime,
        responsetype='code',
        state,
        codechallenge,
        codechallengemethod,
        success = false,
        nonce,
        consent,
        multifactorcode,
        multifactorcodetime,
        offlineaccess     
    } = {}) => {
        if(!uid) {
            throw new Error('Invalid user. Trya again');
        }
        if(!appid) {
            throw new Error('iInvalid Application. Contact administrator')
        }

        if(!multifactorcode && responsetype === 'code' && !code) {
            throw new Error('No code supplied');
        }

        if(!codecreationtime) {
            codecreationtime =  createUTCDate()
        }

        if(typeof offlineaccess === undefined) {
            throw new Error("Offline access required");
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
            getCodeCreationTime: () => codecreationtime,
            setSuccess: (val) => success =  val,
            getMultiFactorCode: () => multifactorcode,
            getCodeChallenge: () => codechallenge,
            getNonce: () => nonce,
            getOfflineAcces: ()=> offlineaccess,
            getCodeChallengeMethod: () => codechallengemethod,
            getConsent: () => consent,
            getMultifactorCodeTime: () => multifactorcodetime ? createUTCDate(multifactorcodetime) : createUTCDate(),
            createToken: (payload)=> createToken(payload, secret)
        });
    }
}
module.exports =  createLoginFactory;