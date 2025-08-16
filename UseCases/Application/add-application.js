const make_application = require('../../Entities/Application');
const make_role =  require('../../Entities/Role');
const make_access =  require('../../Entities/Access');
const add_application = ({app_db}) => {
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
                    const role_obj = make_role(role);
                    approles.push(role_obj);
                }
                data.roles = approles;
            };
            const app =  make_application(data);
            const result =  await app_db.insert_application({
                id: app.getId(),
                applicationname: app.getApplicationName(),
                apikey: app.getAPIKey(),
                disabled: app.isDisabled(),
                domain: app.getDomain(),
                screens: app.getScreens().map(s => s.ToJson()),
                roles: app.getRoles().map(r => r.ToJson()),
                createddate: app.getCreatedDate(),
                lastmodifieddate: app.getLastModifiedDate()
            });
            return result;
        } catch (ex) {
            throw ex;
        }
    }
}
module.exports =  add_application;