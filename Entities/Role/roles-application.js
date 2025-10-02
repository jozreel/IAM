const RolesApplication = ({createUTCDate}) => {
    return ({roleid, applicationid, type, createddate, lastmodifieddate} = {}) => {
        if(!roleid) {
            throw new Error('Role id is required');
        }

        if(!applicationid) {
            throw new Error('Application id is required');
        }

        if(!type) {
            throw new Error('Type is required');
        }

        if(!createddate) {
            createddate =  createUTCDate();
        }

        lastmodifieddate = createUTCDate();
        

        return Object.freeze({
            getRoleId: () =>roleid,
            getApplicationId: () => applicationid,
            getType: () => type,
            getCreatedDate: () => createddate,
            getLastModifiedDate: () => lastmodifieddate,
            ToJson: () => ({
                roleid,
                applicationid,
                type,
                createddate, 
                lastmodifieddate
            })
        })
    }
}

module.exports =  RolesApplication

