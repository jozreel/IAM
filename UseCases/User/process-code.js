const createLogin = require('../../Entities/Login');
const make_user = require('../../Entities/User');
const ProcessCodeUsecase = ({user_db, dateDiff}) => {
    return async (id, data) => {
        try {
            const code = parseInt(data.code);
            const exist = await user_db.get_user(id,false);
            if(!exist) { 
                throw new RangeError('User not found');
            }
           
            if(!exist.lastcode || exist.lastcode !== code) {
                throw new Error('Invalid code');
            }
            console.log(dateDiff(exist.lastcodecreationtime,Date.now(), 'minutes'), 'diff');
            if(dateDiff(exist.lastcodecreationtime,Date.now(), 'minutes') > 5) {
                throw new Error('Invalid code. Expired');
            }
            const user = make_user({...exist, lastcode: null, lastcodecreationtime: null, status: 1});
            const res = await user_db.update_user({
                id,
                lastcode: user.getLastCode(),
                lastcodecreationtime: user.getLastCodeCreationTime(),
                status: user.getStatus()
            });

            const login =  createLogin({
                uid: exist._id,
                success: true,
                appid: data.appid

            });
            const payload = {iat: new Date().valueOf(), uid: login.getUID(), appid: login.getAppID};
            const token = login.createToken(payload);
            res.token =  token;

            return res;

        } catch (ex) {
            throw ex;
        }
    }
}

module.exports = ProcessCodeUsecase;