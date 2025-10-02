const make_application = require('../../Entities/Application');
const {AppRole} =  require('../../Entities/Role');
const make_access =  require('../../Entities/Access');
const crypto =  require('crypto');
const add_application = ({app_db, encrypt_string}) => {
    const create_default_app_roles = (applicationid) => {
        console.log(applicationid)
        const roles = [
            {name: 'manage-account', id: crypto.randomUUID(), applicationid},
            {name: 'view-profile', id: crypto.randomUUID(), applicationid},
            {name: 'manage-users', id: crypto.randomUUID(), applicationid}
        ]

        const mr =  roles.map(r => AppRole(r));

        return mr;
    }
    return async (data) => {
        try {
            const scrnobjmap = new Map();
            const app_id = crypto.randomUUID();
            data.id =  app_id;
            if(data.screens && data.screens.length > 0) {
               
                let scrobjs =  [];
                
                for (let scr of data.screens) {
                    scr.code = await app_db.autoID("accesscodes", {appid: app_id},"counters", 1000);
                    console.log(scr);
                   
                    scr.id =  crypto.randomUUID();
                     scrnobjmap.set(scr.id, true);
                     console.log(scr.code);
                    scr.applicationid = app_id;
                    const scrn = make_access(scr);
                    scrobjs.push(scrn);
                }
                data.screens =  scrobjs;
            }
            
            
            if(data.roles && data.roles.length !== 0) {
                const roles = data.roles;
                const approles = [];
                for(let role of roles) {
                    role.applicationid =  app_id;
                    role.id =  crypto.randomUUID();
                    if(!role.roleid) {
                        role.roleid = crypto.randomUUID();
                    }
                    if(role.access) {
                        const allacc =  [];
                        for(let acc of role.access) {
                            
                            const mr = make_access(acc);
                            if(scrnobjmap.has(mr.GetId()))  {
                                 allacc.push(mr)
                            }
                           
                        }
                        role.access =  allacc;

                    }
                    const role_obj = AppRole(role);
                    approles.push(role_obj);
                }
                data.roles = approles;
            };

            if(data.roles) {
                data.roles = [...data.roles, ...create_default_app_roles(app_id)];
            } else {
                data.roles =  create_default_app_roles(app_id);
            }

             if(data.adminpassword) {

                data.adminpassword =  await encrypt_string(data.adminpassword); 

            }
           const secret = crypto.randomBytes(32).toString('hex');
           data.clientsecret =  secret;

            const app =  make_application(data);
            const result =  await app_db.insert_application({
                id: app.getId(),
                applicationname: app.getApplicationName(),
                apikey: app.getAPIKey(),
                disabled: app.isDisabled(),
                domain: app.getDomain(),
                screens: app.getScreens().map(s => s.ToJson()),
                roles: app.getRoles().map(r => r.ToJson()),
                multifactorenabled: app.isMultifactorEnabled(),
                multifactorchannel: app.getMultifactorChannel(),
                multifactorprovider: app.getMultiFctorProvider(),
                adminpassword: app.getAdminPassword(),
                adminusername: app.getAdminUsername(),
                consents: app.getConsents(),
                logouturl: app.getLogoutUrl(),
                selfregistration: app.canSelfRegister(),
                telephonerequired: app.isTelephoneRequired(),
                createddate: app.getCreatedDate(),
                lastmodifieddate: app.getLastModifiedDate(),
                clientid: app.getClientId(),
                serviceaccountenabled: app.isServiceAccountEnabled(),
                clientsecret: app.getClientSecret(),
                tenantid: app.getTenantId(),
                description: app.getDescription(),
                refreshtokenrotation: app.getRefreshTokenRotation()
            });
            return result;
        } catch (ex) {
            throw ex;
        }
    }
}
module.exports =  add_application;