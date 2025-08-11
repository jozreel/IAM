const make_role =  require('../../Entities/Role');
const add_role = ({role_db}) => {
    return async (req) => {
        try {
            const data = req.data;
            data.id =  crypto.randomUUID();
            const role =  make_role(data);
            const roledata =  role.ToJson();
            const res =  await role_db.InsertRole(roledata);
            return roledata;

        } catch(ex) {
            throw ex;
        }
    }
}

module.exports = add_role;