const get_apps_for_tenant = ({app_db,  check_role_access_by_name}) => {
    return async req => {
        try {
            const {sub, aud} = req.access;
            const app = await check_role_access_by_name(sub, 'view-apps', aud);
            console.log(app);
            const tenantid = req.params.tenantid;
            const  res =  await app_db.get_applications_for_tenant(tenantid);
            return res.map(r => r.ToJson());
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  get_apps_for_tenant;