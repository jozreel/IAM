const strings = require("../../strings");


const serviceaccount_role_db = ({makeDB, ID}) => {

    const assign_role_to_application = async (data) => {
        try {
            
            const db  = await makeDB();
            const ins =  await db.collection(strings.APP_COLLECTON).updateOne({
                _id: data.applicationid
            }, 
            {
                $push: {serviceaccountroles: data}
            }
        )
       
        if(ins.modifiedCount !== 0) {
          return data;
        } else {
            throw new Error('Could not update')
        }

        } catch (ex) {
            throw ex;
        }
    }


    const check_if_role_assigned_to_application = async (roleid, appid) => {
        try {
          
            const db =  await makeDB();
            const match = {_id: appid, "serviceaccountroles.roleid": roleid};
            const rls = await db.collection(strings.APP_COLLECTON).findOne(match, {projection: {serviceaccountroles: 1}})
            return rls && rls.serviceaccountroles ? rls.serviceaccountroles[0] : null;
        } catch (ex) {
            throw ex;
        }

    }

    const remove_role_from_application = async (roleid, appid) => {

        try {
            const db =  await makeDB();
            const rls =  await db.collection(strings.APP_COLLECTON).updateOne({
                _id: appid
            }, {
                $pull: {serviceaccountroles:{roleid}}
            });

            if(rls.modifiedCount > 0) {
                return {removed: true}
            } else {
                throw new Error('Couls not remove role')
            }

        } catch(ex) {
            throw ex;
        }
    }

    const get_all_application_roles = async (appid) => {

        try {
            const db =  await makeDB();
            const _id =  ID(appid);
            const rls =  await db.collection(strings.APP_COLLECTON).findOne({_id}, {projection: {serviceaccountroles: 1}});
            return rls.serviceaccountroles || [];

        } catch(ex) {
            throw ex;
        }
    }

    return Object.freeze({
        assign_role_to_application,
        check_if_role_assigned_to_application,
        remove_role_from_application,
        get_all_application_roles
    })

}

module.exports = serviceaccount_role_db;