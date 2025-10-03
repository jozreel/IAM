const strings = require("../../strings");


const token_db = ({makeDB, ID}) => {
    const AddToken = async (data) => {
        try {
            const db =  await makeDB();
            if(data.loginid) {
            const id = ID(data.loginid); 
                
                const token_save =  await db.collection(strings.LOGIN_COLLECION).updateOne({_id: id}, {
                    $set: {token: data, codeused: true}
                });
                

            

                if(token_save.matchedCount > 0 && token_save.modifiedCount !==0) {
                    return data;
                } else {
                    throw new Error('could not save token data');
                }
        } else {
            const nt =  await db.collection(strings.LOGIN_COLLECION).insertIne(data);
            return {...data, id: nt.insertedId};

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