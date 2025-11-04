const get_assignred_sa_roles = ({app_db, serviceaccount_roles_db}) => {
    return async(req) => {
        try {
            const {id} =  req.params;
            const app =  await app_db.get_application(id);
            if(!app) {
                throw new Error('invalid app');
            }
            const saRoles =  await serviceaccount_roles_db.get_all_application_roles(id);
            return saRoles;
        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  get_assignred_sa_roles;