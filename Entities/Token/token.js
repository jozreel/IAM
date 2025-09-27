const token_factory = ({CreateUtcDate}) => {

     return ({id, token, validuntil, loginid, createddate}) => {
        if(!token) {
            throw new Error('Token required');
        }

        if(!id) {
            throw new Error("Id required");
        }

        if(!validuntil) {
            throw new Error('Valid until date requred')
        }

        if(!loginid) {
            throw new Error('Login id needed');
        }

        const lastmodifieddate =  CreateUtcDate();
        createddate =  createddate ? CreateUtcDate(createddate) : CreateUtcDate();

        return Object.freeze({
            GetId: () => id,
            GetToken: () => token,
            GetValidUntil: () => validuntil,
            GetCreatedDate: () => createddate,
            GetLastModifiedDate: () => lastmodifieddate,
            GetLoginId: () =>loginid,
            ToJson: () => ({
                id,
                token,
                validuntil,
                loginid,
                createddate,
                lastmodifieddate
            })
        });


     }

}

module.exports =  token_factory;