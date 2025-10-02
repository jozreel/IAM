const {AppRole} =  require('../../Entities/Role');
const AddAppRole = ({app_db, role_db}) => {

    return async (req) => {
        try {
            const {data, params} =  req
            const id =  params.id;
            const app =  await app_db.get_application(id);
            if(!app) {
                throw new Error('invalid application');
            }

            const exists = await role_db.GetRoleByName(role.GetName().trim());
            
          
            if(exists) {
                throw new Error("A role with this name alreadt exist");
            }
            const role = AppRole({data, applicationid: id});
            const roledata =  role.ToJson();
            roledata.type = 'app';
           
            const res =  await role_db.InsertRole(roledata);
            return roledata;

           

        } catch(ex) {
            throw ex;
        }
    }

}

module.exports =  AddAppRole;