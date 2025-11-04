const make_login = require('../../Entities/Login');
const ResendCode = ({login_db}) => {
    return async (req) => {
        try {

            const {sessionid} =  req.data; 
            const session =  await login_db.get_login(sessionid);
            if(!session) {
                throw new Error('Could not find session');
            }

            console.log(req.data);

            const existdata = session.ToJson();
            const randcode = Math.floor(100000 + Math.random() * 900000);
            console.log(randcode);
            existdata.multifactorcode = randcode;
            existdata.multifactorcodetime =  new Date();
            const ml =  make_login(existdata);
            
            const upd =  await login_db.update_login({
                id: sessionid, 
                multifactorcode: ml.getMultiFactorCode(),
                multifactorcodetime: ml.getMultifactorCodeTime()
            });
            return {codesent: true, sessionid}

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

}
module.exports =  ResendCode;