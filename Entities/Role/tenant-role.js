const createTenantRoleFactory = ({CreateUtcDate}) => {
    return ({
        id='',
        name,
        tenantid,
        createddate,
        lastmodifieddate =  CreateUtcDate()
    }) => {
        if(!name) {
            throw new Error("Name is required");
        }
        if(!applicationid) {
            throw new Error('An application id is required');
        }

       
        lastmodifieddate = lastmodifieddate ? lastmodifieddate : CreateUtcDate();
        return Object.freeze({
             GetId: () =>id,
             GetName: ()=> name,
             GetAccess: ()=> access,
             GetTenantId: () => tenantid,
             GetCreatedDate: () => createddate ? createddate : CreateUtcDate(),
             GetLastModifiedDate:  () => lastmodifieddate ? lastmodifieddate : CreateUtcDate(),
             ToJson:() => {
                return({
                    id,
                    name,
                    tenantid,
                    createddate: createddate ? createddate : CreateUtcDate(),
                    lastmodifieddate 
                });
             }
        });
    }

}

module.exports = createTenantRoleFactory;