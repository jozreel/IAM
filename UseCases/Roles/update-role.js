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
            const exist_data =  exist.Tojson();
            if(exist_data.access) {
                exist_data.access  = exist_data.acces.map(d => d.id);
            }
            delete exist_data.lastmodifieddate;
            const new_role =  {...exist_data, ...data};
            const role =  make_role(new_role);
            const roledata = role.ToJson();
            await role_db.UpdateAppRole(roledata);
            return roledata;
        } catch(ex) {
            throw ex;
        }
    }
}
module.exports =  update_role;