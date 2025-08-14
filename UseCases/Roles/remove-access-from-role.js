const make_access = require('../../Entities/Access');
const RemoveAccessFromRole = ({role_db}) => {
    return async req => {
        try {
            const id = req.id;
            const rdata = req.data;
            const data = rdata.access;
            const exist = await role_db.GetRoleById(id);
            if(!exist) {
                throw new Error("Could not find the role");
            }
            const jdata =  exist.GetAccess();
            if(typeof data === 'object' && typeof data.push !== 'undefined') {
                const eacc =  exist.GstAccess();
                
                if(eacc) {
                    const emap =  new Map(eacc);
                    data = data.filter(d => emap.has(d));
                }

                if(data.length === 0) {
                    throw new Error("No matching records found");
                }

            } else {
                const inacc = jdata ? jdata.find(j => j === data.access): null;
                if(!inacc) {
                    throw new Error("The access is not assigned to the role")
                }
            }
        
            const upd = await role_db.RemoveAccessFromRole(exist.GetApplicationId(), id, data);
            return upd;

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}
module.exports = RemoveAccessFromRole;
