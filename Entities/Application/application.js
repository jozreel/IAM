const secret = require('../../KEYS').app_secret;
const make_screen =  require('../Access');

const make_role =  require('../Role');
const createApplicationFactory =  ({createUTCDate, generateAPIKey, verifyToken}) => {
    const MaxAppNmameLength = 120;
    const MaxDomainLength = 120;
    return ({
        id,
        applicationname,
        apikey,
        disabled = false,
        roles = [],
        screens= [],
        domain,
        clientid,
        createddate,
        lastmodifieddate = createUTCDate()
    }={}) => {
        console.log(domain);
        if(!applicationname) {
            throw new Error('Invalid application please provide a name');
        }
        if(!domain) {
            throw new Error('Please provide a domain for this application');
        }
        if(applicationname && applicationname.length > MaxAppNmameLength) {
            throw new Error("App name has a max lengrh of "+MaxAppNmameLength);
        }
        if(domain && domain.length > MaxDomainLength) {

            throw new Error('Dommain has a max length od '+domain);
        }

        if(screens.length > 0) {
        let i=0;
            for(let scr of screens) {
                if(typeof scr.GetId === 'undefined') {
                    const  ts = make_screen(scr);
                    screens[i]  =  ts;
                }
                i++;
            }

        }

        if(roles.length > 0) {
            let j =  0;
            for(let rl of roles) {
                if(typeof rl.GetId === 'undefined') {
                    const tr = make_role(rl);
                    roles[j] =  tr;
                }
                j++;
            }
        }


        
        return Object.freeze({
            getId: () => id,
            getApplicationName: () => applicationname,
            getAPIKey: () => apikey,
            isDisabled: () => disabled,
            getDomain:() => domain,
            getClientId: () => clientid,
            getRoles: () => roles,
            disable: () => disabled =  true,
            enable: () => disable = false,
            getScreens: () => screens,
            getCreatedDate: () =>createddate ? createddate : createUTCDate(),
            getLastModifiedDate: () => lastmodifieddate ? lastmodifieddate : createUTCDate(),
            generateKey: (payload)=>generateAPIKey(payload, secret),
            setClientId: (cid) => clientid =  cid,
            setApiKey: (val) => apikey =  val,
            verufyToken: (token) => verifyToken(token),
            setRoles: (val) => roles =  val,
            ToJson: () => ({
                id,
                applicationname: applicationname,
                apikey,
                disabled,
                roles : roles.length > 0 && typeof roles[0].GetId !== 'undefined'  ? roles.map(r => r.ToJson()) : roles,
                screens: screens.length > 0 && screens[0].GetId !== 'undefined' ? screens.map(s => s.ToJson()) :screens,
                domain,
                clientid,
                createddate,
                lastmodifieddate
            })
        });
    }
}
module.exports =  createApplicationFactory;