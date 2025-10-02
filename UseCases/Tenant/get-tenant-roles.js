const GetTenantRoles = ({tenant_role_db}) => {
    return async req =>  {
        try {
            const id = req.params?.id;
            const results =  await tenant_role_db.get_tenant_roles(id);
          
            return results.map(r => r.ToJson());

        } catch(ex){
            throw ex;
        }
    }
}

module.exports = GetTenantRoles;