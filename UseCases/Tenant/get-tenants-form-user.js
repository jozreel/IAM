const GetTenantsForUser = ({tenant_db, check_has_role_by_name}) => {
    return async (req) => {
        try {
            const {user} =  req.query
            const access =  req.access;
           
             console.log('user', user)
            const has_role = await check_has_role_by_name(access.sub, 'view-tenants', access.aud);
            if(!has_role) {
                throw new Error('You do not have access');
            }
            
            const res =  await tenant_db.get_tenants_for_user(user);
            console.log(res)
            return res.map(r => r.toJson());

        } catch(ex){
            console.log(ex);
            throw ex;
        }
    }
} 

module.exports =  GetTenantsForUser;