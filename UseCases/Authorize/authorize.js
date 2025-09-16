const authorization_code = require('./authorization-code');

const authorize_factory = ({verify_token, app_db}) => {


    return async (req) => {
        try {
           
            const {client_id} =  req.query;
           
            if(!client_id) {
                throw new Error('Invalid Client');
            }
            const app = await app_db.get_application(client_id);
           
            if(!app) {
                throw new Error('Client not registered');
            }
            if(req.query && req.query.response_type === 'code') {
                const auth_code =  authorization_code({verify_token});
                const hasMultiFactor =  app.isMultifactorEnabled();
                const consentrequired = app.getConsents();
                const appname =  app.getApplicationName();
                const session_cookie = req.cookies?.refresh_session_cookie;
            
                return await auth_code({...req.query, hasMultiFactor, consentrequired: consentrequired && consentrequired.length > 0 ? consentrequired : null, appname, session_cookie});
            }

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}


module.exports = authorize_factory;