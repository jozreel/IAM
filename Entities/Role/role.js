const createRoleFactory = ({CreateUtcDate}) => {
    return ({
        id='',
        name,
        applicationid,
        access=[],
        createddate,
        lastmodifieddate
    } = {}) => {
        if(!name) {
            throw new Error("Name is required");
        }
        if(!applicationid) {
            throw new Error('An application id is required');
        }

        
        return Object.freeze({
             GetId: () =>id,
             GetName: ()=> name,
             GetAccess: ()=> access,
             GetApplicationId: () => applicationid,
             GetCreatedDate: () => createddate ? createddate : CreateUtcDate(),
             GetLastModifiedDate:  () => lastmodifieddate? lastmodifieddate : CreateUtcDate(),
             ToJson:() => {
                return({
                    id,
                    name,
                    applicationid,
                    access: access.map(a => typeof a.ToJson !== 'undefined' ? a.ToJson() : a),
                    createddate,
                    lastmodifieddate
                });
             }
        });
    }

}

module.exports = createRoleFactory;