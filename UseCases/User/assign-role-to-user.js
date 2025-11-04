const { RolesUsers } = require("../../Entities/Role");

const AssignRoleToUser = ({user_db, app_role_db, tenant_role_db}) => {
    return async (req) => {
        try {
            const {data, access} =  req;
            const id =  req.params.id;
            const user =  await user_db.get_user(id);
            if(!user) {
                throw new Error('Invalid user');
            }
            if(data.appid) {
              const role_exist = await app_role_db.GetRoleById(roleid, data.applicationid);
              if(!role_exist) {
                throw new Error('Invalid app role');
              }
            }
            if(data.tenantid) {
               const t_role_exist = await tenant_role_db.get_tenant_role_by_id(id, data.tenantid);
               if(!t_role_exist) {
                throw new Error('Invalid tenant role');
               }
            }
            const has_role =  await user_db.check_if_role_assigned(id, data.roleid);
            if(has_role) {
                throw new Error('already have role');
            }

            const approle =  RolesUsers({...data, userid: id});

            await user_db.assign_role_to_user(approle.toJson());
            return approle.toJson();

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  AssignRoleToUser;