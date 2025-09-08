const token_factory = ({CreateUtcDate}) => {

     return ({id, token, validuntil, createddate}) => {
        if(!token) {
            throw new Error('Token required');
        }

        if(!id) {
            throw new Error("Id required");
        }

        if(!validuntil) {
            throw new Error('Valid until date requred')
        }

        const lastmodifieddate =  CreateUtcDate();
        createddate =  createddate ? CreateUtcDate(createddate) : CreateUtcDate();

        return Object.freeze({
            GetId: () => id,
            GetToken: () => token,
            GetValidUntil: () => validuntil,
            GetCreatedDate: () => createddate,
            GetLastModifiedDate: () => lastmodifieddate,
            ToJson: () => {
                id,
                token,
                validuntil,
                createddate,
                lastmodifieddate
            }
        });


     }

}

module.exports =  token_factory;