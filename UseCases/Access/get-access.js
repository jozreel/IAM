const get_access = ({access_db}) => {
    return async req => {
        try {
            const id = req.params.id;
            const access =  await access_db.FindAccessById(id);
            if(!access) {
                throw new RangeError("Couild not find the access");
            }

            return access.ToJson();

        } catch(ex) {
            throw ex;
        }
    }
}

module.exports =  get_access;