const { role_db } = require("../../DataDrivers/MongoDB");

const delete_role = ({role_db}) => {
    return async(req) => {
        try {
            const id =  req.params.id;
            const exist = await role_db.GetRoleById(id);
            if(!exist) {
                throw new RangeError("This role does not exist");
            }
            const has_users =  await role_db.CheckRoleUserConstraint(id);
            if(has_users) {
                throw new Error("Cannot delete this role with linked data");
            }
            const  res = await role_db.RemoveAppRole(id, exist.GetApplicationId());
            return {
                deleted: exist.ToJson(), ...res
            };

        } catch (ex) {
            console.log(ex)
            throw ex;
        }
    }
}
module.exports = delete_role;