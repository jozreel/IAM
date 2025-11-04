const Tenant = () => {
    return ({id='', tenantname, createddate, lastmodifieddate, managers=[], tier='basic', roles=[]} = {}) => {
        if(!tenantname) {
            throw new Error('Realm name required');
        }

        return Object.freeze({
            getTenentName: () => tenantname,
            getId: () => id,
            getCreatedDate: () => createddate  || new Date(),
            getLastModifiedDate: () => lastmodifieddate || new Date(),
            getTier: () => tier,
            getManagers: () => managers,
            getRoles: () => roles,
            toJson: () => ({
                id,
                tenantname,
                createddate,
                lastmodifieddate,
                managers,
                roles : roles.map(r => typeof r?.ToJson !== 'undefined' ? r.ToJson() : r) 
            })
        })
    }
}

module.exports =  Tenant;