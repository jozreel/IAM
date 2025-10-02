const RemoveAppRole = ({app_db, app_role_db}) => {
    return async req => {
        try {
            const {appid, roleid} =  req.params;
            const role =  await app_role_db.GetRoleById(roleid, appid);
            if(!role) {
                throw new RangeError('invalid role');
            }
            const app = await app_db.get_application(appid);
             if(!app) {
                throw new RangeError('Invalid application');
            }
            const saroles =  app.getServiceAccountRoles();
            if(saroles) {
                const assigned =  saroles.find(s => s.roleid === roleid);
               
                if (assigned) {
                    throw new Error('Role is assigned');
                }
            }
            const user_is_assighned = await app_role_db.CheckRoleUserConstraint(roleid);
            console.log(user_is_assighned)
            if(user_is_assighned && user_is_assighned.length > 0) {
                throw new Error('role is assigned');
            }
           

            const res =  await app_role_db.RemoveAppRole(roleid, appid);
            console.log(res);
            if(res.deleted) {
                return res;
            } else {
                throw new Error('Could not delete')
            }


        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports = RemoveAppRole;