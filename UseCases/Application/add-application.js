const make_application = require('../../Entities/Application');
const add_application = ({app_db}) => {
    return async (data) => {
        try {

            const app =  make_application(data);
            if(app.getRoles().length !== 0) {
                const roles = app.getRoles();
                for(let role of roles) {
                    if(!role.roleid) {
                        role.roleid = app_db.autoID('approleids', {appid: id});
                    }
                    
                }
                app.setRoles(roles);
            };
            const result =  await app_db.insert_application({
                applicationname: app.getApplicationName(),
                apikey: app.getAPIKey(),
                disabled: app.isDisabled(),
                domain: app.getDomain(),
                screens: app.getScreens(),
                roles: app.getRoles(),
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