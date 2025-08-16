const make_access = require('../../Entities/Access');
const AddAccessToRole = ({role_db}) => {
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
                        console.log(has, emap.has(d))
                        dmap[d] = 1; 
                        return  !has && !emap.has(d);
                    });
                }
               

            } else {
                const inacc = jdata ? jdata.find(j => j === data.access): null;
                if(inacc) {
                    return exist.ToJson();
                }
            }
        
            const upd = await role_db.AddAccessToRole(exist.GetApplicationId(), id, data);
            return {...exist.ToJson(), access: [...jdata, ...data]};

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  AddAccessToRole;