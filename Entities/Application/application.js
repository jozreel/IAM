const secret = require('../../KEYS').app_secret;
const make_screen =  require('../Access');

const make_role =  require('../Role');
const MultiFactorChannels = require('./multi-factor-channels');
const createApplicationFactory =  ({createUTCDate, generateAPIKey, verifyKey, hashKey}) => {
    const MaxAppNmameLength = 120;
    const MaxDomainLength = 120;
    const MaxKeyLength = 64;
    const SaltRounds = 10;
    const LogoutUrlMaxLength =  512;
    return ({
        id,
        applicationname,
        apikey,
        disabled = false,
        roles = [],
        screens= [],
        domain,
        clientid,
        loginprovider = 'openid',
        createddate,
        multifactorenabled = true,
        multifactorchannel = MultiFactorChannels.EMAIL,
        multifactorprovider = 'local',
        adminusername,
        adminpassword,
        logouturl,
        consents = [],
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

        if(logouturl && logouturl.length > LogoutUrlMaxLength) {
            throw new Error('Logout url has a max length of '+LogoutUrlMaxLength)
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
            generateKey: ()=>generateAPIKey(),
            setClientId: (cid) => clientid =  cid,
            getLoginProvider: () => loginprovider,
            setApiKey: (val) => apikey =  val,
            verifyKey: (key, hashed) => verifyKey(key, hashed),
            hashKey: (key) => hashKey(key),
            setRoles: (val) => roles =  val,
            getMultifactorChannel: () => multifactorchannel,
            isMultifactorEnabled: () => multifactorenabled,
            getMultiFctorProvider: () => multifactorprovider,
            getAdminUsername: () => adminusername,
            getAdminPassword: () => adminpassword,
            getConsents: () => consents,
            getLogoutUrl: () => logouturl,
            ToJson: () => ({
                id,
                applicationname: applicationname,
                apikey,
                disabled,
                roles : roles.length > 0 && typeof roles[0].GetId !== 'undefined'  ? roles.map(r => r.ToJson()) : roles,
                screens: screens.length > 0 && screens[0].GetId !== 'undefined' ? screens.map(s => s.ToJson()) :screens,
                domain,
                clientid,
                loginprovider,
                multifactorchannel,
                multifactorenabled,
                multifactorprovider,
                adminusername,
                adminpassword,
                consents,
                logouturl,
                createddate,
                lastmodifieddate
            })
        });
    }
}
module.exports =  createApplicationFactory;