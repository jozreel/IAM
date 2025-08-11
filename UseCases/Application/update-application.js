const make_application =  require('../../Entities/Application');
const update_app = ({app_db, user_db, generate_unique_key}) => {
    const check_roles = async (oldroles, newroles, appid) => {
        for(let role of oldroles) {
            const find =  newroles.find(r => r.roleid === role.roleid);
            if(!find) {
                console.log(find);
                const user =  await user_db.find_with_role(role.roleid, appid);
                if(user.length > 0) {
                    throw new Error('There are users assigned to this role');
                
                }
            }
        }
    }
    return async (id, changes) => {
        try {
            console.log(id, changes);
            const exist =  await app_db.get_application(id);
            if(!exist) {
                throw new RangeError('Application does not exist');
            }
            const app =  make_application({...exist, ...changes});
           
            if(app.getRoles().length !== 0) {
                await check_roles(exist.roles, app.getRoles(), exist._id.toString());
                const roles = app.getRoles();
                for(let role of roles) {
                    if(!role.roleid) {
                        role.roleid = await app_db.autoID('approleids', {appid: id});
                    }
                    
                }
                console.log(roles);
                app.setRoles(roles);
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
                roles: app.getRoles(),
                screens: app.getScreens(),
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