const make_user = require('../../Entities/User');

const GenerateCodeUseCase = ({user_db, sms_utils}) => {
    return async id => {
        try {
            const exist =  await user_db.get_user(id);
            if (!exist) {
                throw new Error('This user does not exist');
            }
            const randcode = Math.floor(100000 + Math.random() * 900000);
        
            const user = make_user({...exist, lastcode:randcode});
            user.createLastCodeCreatedTime();
            const res =  await user_db.update_user({
                id,
                lastcode: user.getLastCode(),
                lastcodecreationtime: user.getLastCodeCreationTime(),
                lastmodifieddate: user.getLastModifiedDate()
            });

            await sms_utils.SendSms(user.getTelephone(), `This message is comming from vepp. Your code is ${randcode}`)

            return {
                _id: id,
                //lastcode: randcode,
                lastcodecreationtime: user.getLastCodeCreationTime()
            };



        } catch (ex) {
            throw ex;
        }
    }
}
module.exports =  GenerateCodeUseCase;