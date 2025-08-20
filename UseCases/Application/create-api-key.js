const make_application =require('../../Entities/Application');
const create_api_key = ({app_db}) => {
    return async (req) => {
        try {
             const unique_key =  crypto.randomUUID();
             const id = req.params.id;
             const data =  req.data;
             const exist = await app_db.get_application(id);
             if(!exist) {
                throw new Error("Application not found");
             }

             const key = exist.generateKey();
             if(exist.getAPIKey()) {
                throw new Error('Api key already generated for app '+ exist.getApplicationName())
             }
             const hashed_key = await  exist.hashKey(key);
             const app = make_application({...exist.ToJson(), clientid: unique_key, apikey: hashed_key});
             const res =  await app_db.update_application(
                {id,
                 apikey: app.getAPIKey(),
                 clientid: app.getClientId(),
                 ...data
                }
             );
             if(res) {
                return {
                    apikey: `${id}.${key}`
                }
             } else {
                throw new Error('Could not generater the api key');
             }

             //app.setClientId(unique_key);
           /* const key =  app.generateKey({
                    iat: new Date(),
                    app: exist._id,
                    clientid: unique_key,
                    domain: app.getDomain(),
                    referer: exist.appurl
             });*/
            //app.setApiKey(key);

        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
}

module.exports = create_api_key;