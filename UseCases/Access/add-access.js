const make_access =  require('../../Entities/Access')
const add_access = ({access_db}) => {
    return async (req) => {
        try {
            const data = req.data;
            data.code = await access_db.GetNextId("accesscodes", {appid: data.appid});
            if(data.code < 100) {
                data.code = 1000;
            }
            const access = make_access(data);
            const exist = access_db.FindAccessBycode(access.GetCode());
            if(exist) {
                throw new Error("Suplicate access code");
            }
            const idata = access.ToJson();
            await access_db.InsertAccess(idata);
            return idata

        } catch(ex) {
            throw ex;
        }
    }
}

module.exports = add_access;