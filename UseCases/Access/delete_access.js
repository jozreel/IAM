const make_access =  require('../../Entities/Access');
const delete_access = ({access_db}) => {
    return async(req) => {
        try {
            const exist = await access_db.FindAccessById(req.params.id);
            if(!exist) {
                throw new Error("The access was not found");
            }
            
            const has_roles =  await access_db.CheckAccessRoleConstraint(exist.GetId(), exist.GetApplicationId());
            if(has_roles) {
                throw new Error("Cannot delete this access with linked roles");
            }
            const res = await access_db.RemoveAppAccess(exist.GetApplicationId(), exist.GetId());
            return {deleted: exist.ToJson(), ...res};

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  delete_access;