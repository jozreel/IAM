const make_access =  require('../../Entities/Access')
const add_access = ({access_db}) => {
    return async (req) => {
        try {
           
            const data = req.data;
            if(!data.appid) {
                data.applicationid = req.appid;
            }
            data.id =  crypto.randomUUID();
            data.code = await access_db.GetNextCode("accesscodes", {appid: data.applicationid});
            if(data.code < 100) {
                data.code = 1000;
            }
            const access = make_access(data);
            const exist = await access_db.FindAccessBycode(access.GetCode());
            if(exist) {
                throw new Error("Suplicate access code");
            }
            const idata = access.ToJson();
            await access_db.InsertAccess(idata);
            return idata

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports = add_access;