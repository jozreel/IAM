const createRoleFactory = ({CreateUtcDate}) => {
    return ({
        id='',
        name,
        applicationid,
        access=[],
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
             GetApplicationId: () => applicationid,
             GetCreatedDate: () => createddate ? createddate : CreateUtcDate(),
             GetLastModifiedDate:  () => lastmodifieddate ? lastmodifieddate : CreateUtcDate(),
             ToJson:() => {
                return({
                    id,
                    name,
                    applicationid,
                    access: access.map(a => typeof a.ToJson !== 'undefined' ? a.ToJson() : a),
                    createddate: createddate ? createddate : CreateUtcDate(),
                    lastmodifieddate 
                });
             }
        });
    }

}

module.exports = createRoleFactory;