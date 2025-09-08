const strings = require("../../strings");


const token_db = ({makeDB, ID}) => {
    const AddTOken = async (data) => {
        try {
            const db =  await makeDB();
            const id = ID(data.loginid); 

            const token_save =  await db.collections(strings.LOGIN_COLLECION).updateOne({_id: id}, {
                $set: {token: data}
            });

            if(token.matchedCount > 0 && token.modifiedCount !==0) {
                return data;
            } else {
                throw new Error('could not save token data');
            }
        } catch(ex) {
            throw (ex);
        }
    }


    const GetToken = async (id) => {
        try {
            const db =  await makeDB();

            const res =  await db.collections(strings.LOGIN_COLLECION).finOne({"token.id": id});
            return res;

        } catch (ex) {
            throw (ex);
        }
    }

     return Object.freeze({
            AddTOken,
            GetToken
        });

}

module.exports =  token_db;