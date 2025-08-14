const make_access = require('../../Entities/Access');
const AddAccessToRole = ({role_db}) => {
    return async req => {
        try {
            const id = req.params.id;
            const rdata = req.data;
            const data = rdata.access;
            const exist = await role_db.GetRoleById(id);
            console.log(exist, id);
            if(!exist) {
                throw new Error("Could not find the role");
            }
            const jdata =  exist.GetAccess();
            if(typeof data === 'object' && typeof data.push !== 'undefined') {
                const eacc =  exist.GstAccess();
                
                if(eacc) {
                    const emap =  new Map(eacc);
                    data = data.filter(d => !emap.has(d));
                }

            } else {
                const inacc = jdata ? jdata.find(j => j === data.access): null;
                if(inacc) {
                    return exist.TOJson();
                }
            }
        
            const upd = await role_db.AddAccessToRole(exist.GetApplicationId(), id, data);
            return exist;

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  AddAccessToRole;