const get_role = ({role_db}) => {
    return async(req) => {
        try {
            const id =  req.params.id;
            const role = await role_db.GetRoleById(id);
            if(!role) {
                throw new RangeError("The role does not exist");
            }
           
            const roledata = role.ToJson();
            return roledata;  
        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  get_role;