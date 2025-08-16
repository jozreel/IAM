const make_access = require('../../Entities/Access');
const RemoveAccessFromRole = ({role_db}) => {
    return async req => {
        try {
            const id = req.params.id;
            const rdata = req.data;
            
            let data = rdata.access;
            const exist = await role_db.GetRoleById(id);
            
            if(!exist) {
                throw new Error("Could not find the role");
            }
            const jdata =  exist.GetAccess();
            if(typeof data === 'object' && typeof data.push !== 'undefined') {
                const eacc =  exist.GetAccess();
                
                if(eacc) {
                    const emap =  new Map(eacc.map(a => [a,true]));
                   
                    const dmap = {};
                    data = data.filter(d => {
                        const has = dmap[d] || false;
                      
                        dmap[d] = 1; 
                        return  !has && emap.has(d);
                    });
                   
                }

                if(data.length === 0) {
                    throw new Error("No matching records found");
                }

            } else {
                console.log(jdata, data.access);
                const inacc = jdata ? jdata.find(j => j === data): null;
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
