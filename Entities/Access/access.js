const create_access_factory = ({CreateUtcDate}) => {
    return ({
        id='',
        applicationid,
        accessname,
        code,
        createddate,
        lastmodifieddate
    }={}) => {
        if(!applicationid) {
            throw new Error('An application is required');
        }
        if(!accessname) {
            throw new Error('Please suply an access name');
        }
        if(!code) {
            throw new Error('Please suply an access code');
        }
        return Object.freeze({
            GetAccessName: () => accessname,
            GetCode: () => code,
            GetApplicationId: ()=>applicationid,
            GetCreatedDate: () => createddate ? createddate : CreateUtcDate(),
            GetId: ()=>id,
            GetLastModifiedDate: () => lastmodifieddate ? lastmodifieddate : CreateUtcDate(),
            ToJson: () => {
                return {
                    id,
                    applicationid,
                    accessname,
                    code,
                    lastmodifieddate,
                    createddate
                };
            }
        })
    }
}
module.exports = create_access_factory;