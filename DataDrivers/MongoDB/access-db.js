

const strings = require("../../strings");
const make_access = require('../../Entities/Access');

const access_db_factory = ({makeDB, ID, autoID}) => {

    const InsertAccess = async(accessdata) => {
        try {
            const db =  await makeDB();
            const appid =  ID(accessdata.applicationid);
            const upd =  await db.collection(strings.APP_COLLECTON).findOneAndUpdate({_id: appid}, {
                $push: {screens: accessdata}
            }, {returnOriginal: false});
            return upd ? upd.value : null;

        } catch(ex) {
            throw ex;
        }

    }

    const FindAccessBycode = async (code) => {
        try {
            const db = await makeDB();
            //const _id =  ID(appid);
            const accs =  db.collection(strings.APP_COLLECTON).aggregate([{
                $match: {"access.code": code}}, 
                {$project: {screens: {$filter: {
                    input: "$screens",
                    as: "screen",
                    cond: {$eq: ["$$screen.code", code]}}}}},
                {$unwind: "$screens"},
                {$addFields: {"screens.applicationid": "$_id"}},
                {$replaceRoot: { newRoot: "$screens" } }
            ]);
            const arr = await accs.toArray();
            const accs_data =  arr[0];
            if(accs_data) {
                const res = build_access(accs_data);
                return res;
            }
        


        } catch (ex) {
            throw ex;
        }

    }


     const FindAccessById = async (id) => {
        try {
            const db = await makeDB();
           
            const accs =  db.collection(strings.APP_COLLECTON).aggregate([{
                $match: {"screens.id": id}}, 
                {$project: {screens: {$filter: {
                    input: "$screens",
                    as: "screen",
                    cond: {$eq: ["$$screen.id", id]}}}}},
                {$unwind: "$screens"},
                {$addFields: {"screens.applicationid": "_id"}},
                {$replaceRoot: { newRoot: "$screens" } }
            ]);
           const arr =  await accs.toArray();
           const accs_data =  arr[0];
           if(accs_data) {
              const res = build_access(accs_data);
              return res;
           }
        


        } catch (ex) {
            throw ex;
        }

    }


    const UpdateAccess = async(id, access) => {
        try {
            const db = await makeDB();
            const res =  await db.collection(strings.APP_COLLECTON).updateOne(
                {"screens.id": id},
                {$set: {"screens.$": {...access}}}
            );
            if(res.matched > 0) {
                return access;
            } else {
                throw new Error("Could not update this access");
            }

        } catch (ex) {
            throw ex;
        }
    }

    const RemoveAppAccess =  async(appid, id) => {
        try {
            const db =  await makeDB();
            const _id =  ID(appid);
            const  res =  await db.collection(strings.APP_COLLECTON).updateOne(
                {_id},
                {pull: {"screens": {id}}}
            )  
            if(res.matched > 0) {
                return {deleted:  true}
            } else {
                throw new Error('Could not delete this access');
            }

        } catch (ex) {
            throw ex;
        }
    }


    const GetAllAppAccess = async (appid) => {
        try {
            const db = makeDB();
            const _id =ID(appid);
            let res = [];
            const crs =  await db.collection(strings.APP_COLLECTON).findOne({_id}, {projection: {id: 0, screens: 1}});
            if(crs && crs.screens) {
                for(let scr of crs.screens) {
                    if(!scr.applicationid) {
                        scr.applicationid =  appid;
                    }
                    const rd =  build_access(scr);
                    res.push(rd);

                }
                return res;
            } else {
                throw new Error('Could not get the data requested');
            } 

        } catch(ex) {
            throw ex;
        }

    }

    const CheckAccessRoleConstraint = async (id, appid) => {
        try {
            const db = await makeDB();
            const _id =  Id(appid);
            const crs =  await scrollBy.collection(strings.APP_COLLECTON).findOne({
                _id,
                "roles.access": id
            }, {projection: {roles: 1}});
            if(crs) {
                const roe =  crs.roles[0];
                if(roe && !roe.applicationid) {
                    roe.applicationid = crs._id;
                }
                return roe;
            }
             
        } catch(ex) {
            throw ex;
        }
    }

    const build_access = (data) => {
        const access = make_access({
            id: data.id,
            applicationid: data.applicationid,
            accessname: data.accessmame,
            code: data.code,
            createddate: data.createddate,
            lastmodifieddate: data.lastmodifieddate
        });
        return access;
    }



    return Object.freeze({
        InsertAccess,
        FindAccessById,
        FindAccessBycode,
        UpdateAccess,
        RemoveAppAccess,
        GetAllAppAccess, 
        CheckAccessRoleConstraint,
        GetNextCode: autoID
    })

}

module.exports = access_db_factory;