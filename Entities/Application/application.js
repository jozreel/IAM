const secret = require('../../KEYS').app_secret;
const createApplicationFactory =  ({createUTCDate, generateAPIKey, verifyToken}) => {
    return ({
        applicationname,
        apikey,
        disabled = false,
        roles = [],
        screens= [],
        domain,
        clientid,
        createddate = createUTCDate()
    }={}) => {
        if(!applicationname) {
            throw new Error('Invalid application please provide a name');
        }
        if(!domain) {
            throw new Error('Please provide a domain for this application');
        }
        
        return Object.freeze({
            getApplicationName: () => applicationname,
            getAPIKey: () => apikey,
            isDisabled: () => disabled,
            getDomain:() => domain,
            getClientId: () => clientid,
            getRoles: () => roles,
            disable: () => disabled =  true,
            enable: () => disable = false,
            getScreens: () => screens,
            getCreatedDate: () =>createddate,
            getLastModifiedDate: () => createUTCDate(),
            generateKey: (payload)=>generateAPIKey(payload, secret),
            setClientId: (cid) => clientid =  cid,
            setApiKey: (val) => apikey =  val,
            verufyToken: (token) => verifyToken(token),
            setRoles: (val) => roles =  val
        });
    }
}
module.exports =  createApplicationFactory;