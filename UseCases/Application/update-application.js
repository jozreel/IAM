const make_application =  require('../../Entities/Application');
const make_role = require('../../Entities/Role');
const make_access = require('../../Entities/Access');
const update_app = ({app_db, user_db, role_db, access_db, generate_unique_key, encrypt_string}) => {
    const check_roles = async (oldroles, newroles, appscreens) => {
        const nrmap =  new Map(newroles.map(r => [r.GetId(), true]));
       
        for(let role of oldroles) {

            const find =  nrmap.has(role.GetId()); //newroles.find(r => r.roleid === role.roleid);
            if(!find) {
               
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
            if(!find) {
                const inrole = await access_db.CheckAccessRoleConstraint(acc.GetId(), acc.GetApplicationId());
                if (inrole) {
                    
                    throw new Error('This access '+acc.GetAccessName()+' is assigned to one or more roles');
                }
            }
        }

    }
    return async (req) => {
        try {
            const id =  req.params.id;
            const changes = req.data;
           
            const exist =  await app_db.get_application(id);
            const updatedata = {roles: [],screens:[]};
            if(!exist) {
                throw new RangeError('Application does not exist');
            }

            if(changes.screens) {
                const accrob = [];
                 const accessupd = [];
                 const accessnew = [];
                for(let acc of changes.screens) {
                    if(acc.id) {
                        const ae =  await access_db.FindAccessById(acc.id, id);
                        if(!ae) {
                            throw new Error('Access with id '+ acc.id+ " does not exist");
                        }
                        //remove last modified date from object
                        const aedata =  ae.ToJson();
                        delete aedata.lastmodifieddate;
                        const na =  make_access({...aedata, ...acc});
                        accessupd.push(na);
                        accrob.push(na);
                    } else {
                        acc.id = crypto.randomUUID();
                        acc.applicationid =  id;
                        const hasname = await access_db.FindAccessByName(acc.accessname, id);
                      
                        if(hasname) {
                            throw new Error("An access with the name "+ acc.accessname+ " already exist");
                        }
                        acc.code = await app_db.autoID("accesscodes", {appid: id},"counters"); 
                        const naa = make_access(acc);
                         accessnew.push(naa);
                        accrob.push(naa);
                    }
                }
                changes.screens =  accrob;
                 updatedata.screens.push({id, updatedaccess: accessupd, newaccess: accessnew});
            }

            if(changes.roles) {
                 let ro = [];
                
                for(let role of changes.roles) {
                    role.applicationid = id;
                     
                     if(role.access) {
                            const raobj = [];
                            for(let acc of role.access) {
                                
                                const ma = changes.screens.find(s => s.GetId() === acc)
                               
                                if(ma) {
                                    raobj.push(ma);
                                }
                            }
                            role.access = raobj;
                             
                        }
                       
                   
                    if(role.id) {
                        const rex =  await role_db.GetRoleById(role.id, id);
                        
                        if(!rex) {
                                throw new Error('A role with id '+role.id+" does not exist");
                        }
                        
                       
                        const rexdata =  rex.ToJson();
                        delete rexdata.lastmodifieddate;
                       
                        const arl = make_role({...rexdata, ...role});
                        
                        ro.push(arl);
                        
                    } else {
                        const re = await role_db.GetRoleByName(role.name.trim(), id);
                         if(re) {
                            throw new Error(`Role with the name ${role.name} already exist`);
                         }
                        role.id = crypto.randomUUID();
                        const nr =  make_role(role);
                        ro.push(nr);
                    }
                    
                   
                    

                }
                changes.roles = ro;
            }

            if(changes.adminpassword) {

                changes.adminpassword =  await encrypt_string(changes.adminpassword); 

            }
            
            const app =  make_application({...exist.ToJson(), ...changes});
           
            if(app.getRoles().length !== 0) {
             
                const screenmap = new Map(app.getScreens().map(s => [s.GetId(), true]));
                if(changes.roles) {
                  await check_roles(exist.getRoles(), app.getRoles(),screenmap);
                }
                const roles = app.getRoles();
               /* for(let role of roles) {
                    if(!role.roleid) {
                        role.roleid = crypto.randomUUID(); //await app_db.autoID('approleids', {appid: id});
                    }
                    
                }*/
               
                //app.setRoles(roles);
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

            

           

          // console.log(app.getRoles().map(r => r.ToJson()));
            const result =  await app_db.update_application({
                id,
                applicationname: app.getApplicationName(),
                apikey: app.getAPIKey(),
                disabled: app.isDisabled(),
                clientid: app.getClientId(),
                domain: app.getDomain(),
                roles: app.getRoles().map(r => ({...r.ToJson(), access: r.GetAccess().map(a => a.GetId())})),
                screens: app.getScreens().map(sct => sct.ToJson()),
                multifactorchannel: app.getMultifactorChannel(),
                multifactorenabled: app.isMultifactorEnabled(),
                multifactorprovider: app.getMultiFctorProvider(),
                adminpassword: app.getAdminPassword(),
                adminusername: app.getAdminUsername(),
                consents: app.getConsents(),
                logouturl: app.getLogoutUrl(),
                createddate: app.getCreatedDate(),
                lastmodifieddate: app.getLastModifiedDate()
            });

          
            return result;

        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = update_app;