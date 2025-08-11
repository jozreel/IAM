const get_role = ({roledb}) => {
    return async(req) => {
        try {
            const id =  req.params.id;
            const role = await roledb.GetRoleById(id);
            if(!role) {
                throw new RangeError("The role does not exist");
            }
            const roledata = role.ToJaon();
            return roledata;  
        } catch(ex) {
            throw ex;
        }
    }
}

module.exports =  get_role;