const crypto = require('crypto');
const make_app =  require('../../Entities/Application');
const GenerateAppSecret = ({app_db}) => {
    return async (req) => {
        try {
        const {clientid} =  req.data;

        const app =  await app_db.get_application(clientid);
        if(!app) {
            throw new RangeError('Could not find app');
        }

        const secret = crypto.randomBytes(32).toString('hex');
        const appdata =  app.ToJson();
        const new_app =  make_app({...appdata, clientsecret: secret});

        const upd =  await app_db.update_application({id: clientid, clientsecret: new_app.getClientSecret()});
        return new_app.ToJson();
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
    }

}

module.exports =  GenerateAppSecret;