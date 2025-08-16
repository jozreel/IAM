const make_application =  require('../../Entities/Application');
const make_role = require('../../Entities/Role');
const make_access = require('../../Entities/Access');
const update_app = ({app_db, user_db, role_db, access_db, generate_unique_key}) => {
    const check_roles = async (oldroles, newroles, appscreens) => {
        const nrmap =  new Map(newroles.map(r => [r.GetId(), true]));
        for(let role of oldroles) {
            const find =  nrmap.has(role.GetId()); //newroles.find(r => r.roleid === role.roleid);
            if(!find) {
                console.log(role);
                const user =  await role_db.CheckRoleUserConstraint(role.GetId());  // user_db.find_with_role(role.roleid, appid);
                if(user) { 
                    throw new Error('There are users assigned to this role');
                
                }
            }
        }

        for (let rl of newroles) {
            for(let accs of rl.GetAccess()) {
                if(!appscreens.has(accs.GetId())) {
                    throw new Error('You are attempting to assign an access to a role byut the access will be deleted');
                }
            }
        }

    }

    const check_access = async (oldaccess, newaccess) => {
        const nrmap =  new Map(newaccess.map(a => [a.GetId(), true]));
        for(let acc of  oldaccess) {
            const find =  nrmap.has(acc.GetId());
            if(find) {
                const inrole = await access_db.CheckAccessRoleConstraint(acc.GetId(), acc.GetApplicationId());
                if (inrole) {
                    throw new Error('This access is assigned to one or more roles');
                }
            }
        }

    }
    return async (req) => {
        try {
            const id =  req.params.id;
            const changes = req.data;
            console.log(id, changes);
            const exist =  await app_db.get_application(id);
            const updatedata = {roles: []};
            if(!exist) {
                throw new RangeError('Application does not exist');
            }

            if(changes.roles) {
                for(let role of changes.roles) {
                    role.applicationid = id;
                    if(!role.id) {
                         const re = await role_db.GetRoleByName(role.name.trim());
                         if(re) {
                            throw new Error(`Role with the name ${role.name} already exist`);
                         }
                        role.id = crypto.randomUUID();
                    } 
                  

                    if(changes.access) {

                        const accessupd = [];
                        const accessnew = [];
                        for (let acc of changes.access) {
                            if(!acc.id) {
                                const ae =  await access_db.FindAccessByName(acc.name);
                                if(ae) {
                                    throw new Error(`An access with the name ${acc.name} already exist`);
                                }
                                acc.applicationid = id;
                                acc.code = await app_db.autoID("accesscodes", {appid: app_id},"counters");
                                const access_new =  make_access(acc);
                                accessnew.push(access_new);
                            } else {
                                 const upd_access =  make_access(acc);
                                 accessupd.push(upd_access);
                            }
                           
                           

                        }
                        role.access = [...accessnew, ...accessupd];
                        updatedata.roles.push({id, updatedaccess: accessupd, newaccess: accessnew});
                      
                    }

                    const ro = make_role(role);
                    changes.roles = ro;

                }
            }
            console.log(exist);
            const app =  make_application({...exist.ToJson(), ...changes});
           
            if(app.getRoles().length !== 0) {
                console.log(app.getScreens())
                const screenmap = app.getScreens().map(s => [s.GetId(), true]);
                if(changes.roles) {
                  await check_roles(exist.getRoles(), app.getRoles(),screenmap);
                }
                const roles = app.getRoles();
                for(let role of roles) {
                    if(!role.roleid) {
                        role.roleid = crypto.randomUUID(); //await app_db.autoID('approleids', {appid: id});
                    }
                    
                }
                console.log(roles);
                app.setRoles(roles);
            }
            if(app.getScreens() && app.getScreens().length > 0 && changes.screens) {
                await check_access(exist.getScreens(), app.getScreens());
            }
            
            if(changes.cmd && changes.cmd.toLowerCase() === 'generate_key') {

                const unique_key =  generate_unique_key();
                app.setClientId(unique_key);
                const key =  app.generateKey({
                    iat: new Date(),
                    app: exist._id,
                    clientid: unique_key,
                    domain: app.getDomain(),
                    referer: exist.appurl
                });
                app.setApiKey(key);
            }

           
            const result =  await app_db.update_application({
                id,
                applicationname: app.getApplicationName(),
                apikey: app.getAPIKey(),
                disabled: app.isDisabled(),
                clientid: app.getClientId(),
                domain: app.getDomain(),
                roles: app.getRoles().map(r => r.ToJson()),
                screens: app.getScreens().map(sct => sct.ToJson()),
                createddate: app.getCreatedDate(),
                lastmodifieddate: app.getLastModifiedDate()
            });

            console.log(result);
            return result;

        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = update_app;