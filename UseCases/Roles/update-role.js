const make_role =  require('../../Entities/Role');
const update_role = ({role_db}) => {
    return async (req) => {
        try {
            const id = req.params.id;
            const data =  req.data;
            const exist =  await role_db.GetRoleById(id);
            if(!exist) {
                throw new RangeError("The role was not found");
            }
            
            const exist_data =  exist.ToJson();
            if(exist_data.access) {
                exist_data.access  = exist_data.access.map(d => d.id);
            }
            delete exist_data.lastmodifieddate;
            const new_role =  {...exist_data, ...data};
            const role =  make_role(new_role);
            const get_with_name = await role_db.GetRoleByName(role.GetName());
            if(get_with_name && get_with_name.GetId() !== id) {
                throw new Error('Another role with this name already exist');
            }
            const roledata = role.ToJson();
            await role_db.UpdateAppRole(roledata);
            return roledata;
        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}
module.exports =  update_role;