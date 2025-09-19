const strings = require("../../strings");


const token_db = ({makeDB, ID}) => {
    const AddToken = async (data) => {
        try {
            const db =  await makeDB();
            const id = ID(data.loginid); 
            console.log(id, data.loginid);
            const token_save =  await db.collection(strings.LOGIN_COLLECION).updateOne({_id: id}, {
                $set: {token: data, codeused: true}
            });
            

            console.log(token_save)

            if(token_save.matchedCount > 0 && token_save.modifiedCount !==0) {
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

            const res =  await db.collection(strings.LOGIN_COLLECION).finOne({"token.id": id});
            return res;

        } catch (ex) {
            throw (ex);
        }
    }

    const GetTokenForSession  = async (sessionid) => {
        try  {
            const db = await makeDB();
            const _id =  ID(sessionid);
            const res =  await db.collection(strings.LOGIN_COLLECION).findOne({_id}, {projection: {token: true, uid: true, offlineaccess: true}});

            return res;
            
        } catch(ex) {
            throw ex;
        }
    }




     return Object.freeze({
            AddToken,
            GetToken,
            GetTokenForSession
        });

}

module.exports =  token_db;