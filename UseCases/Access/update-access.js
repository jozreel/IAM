const make_access = require('../../Entities/Access');
const update_access = ({access_db}) => {
    return async(req) => {
        try {
            const id = req.params.id;
            const data =  req.data;
            delete data.code;
            const exist = await access_db.FindAccessById(id);
            if(!exist) {
                throw new RangeError("This access does not exist");
            }
            const old_access_data = exist.ToJson();
            delete old_access_data.lastmodifieddate;
    
            const new_access =  {...old_access_data, ...data};
            const access = make_access(new_access);
            const updata =  access.ToJson();
            await access_db.UpdateAccess(id,updata);
            return updata;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}
module.exports =  update_access;