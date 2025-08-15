const make_role =  require('../../Entities/Role');
const add_role = ({role_db}) => {
    return async (req) => {
        try {
            const data = req.data;
            data.id =  crypto.randomUUID();
            const role =  make_role(data);
            const exists = await role_db.GetRoleByName(role.GetName().trim());
            
            console.log(exists ? exists.ToJson() : "");
            if(exists) {
                throw new Error("A role with this name alreadt exist");
            }
            const roledata =  role.ToJson();
            console.log(roledata);
            const res =  await role_db.InsertRole(roledata);
            return roledata;

        } catch(ex) {
            console.log(ex)
            throw ex;
        }
    }
}

module.exports = add_role;