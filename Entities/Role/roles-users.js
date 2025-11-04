const RolesUsers = () => {
    return ({roleid, userid, type, createddate, lastmodifieddate}={}) => {
        if(!roleid) {
            throw new Error('Must have a role id');
        }

        if(!userid) {
            throw new Error('Must have a user id')
        }

        if(!createddate) {
            createddate = new Date();
        }
        if(!type) {
            throw new Error('You must have a type');
        }

        lastmodifieddate =  new Date();

        return Object.freeze({
            getRoleId: () => roleid,
            getUserId: ()=>userid,
            getType: () => type,
            getCreatedDate: () => createddate,
            getLastmodifiedDate: () => lastmodifieddate,
            toJson: () => ({
                roleid,
                userid,
                type,
                createddate,
                lastmodifieddate
            })
        });
    }
}

module.exports =  RolesUsers;