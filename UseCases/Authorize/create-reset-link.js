const usermodel =  require ('../../Entities/User');
const crypto =  require('crypto');
const CreateResetLink = ({user_db, message_service}) => {
    return async (req) => {
        try {

            const {email} = req.data;
            
            const user = await user_db.find_by_email({email});
            if(!user) {
                throw new Error('Could not find user');
            }
            const resetcode =  crypto.randomBytes(48).toString('hex');
            
            const userdata = user.ToJson();
            const currentattempts =  userdata.resetattemts;
            const lastresetcodetime =  userdata.resetcodecreationtime;
            userdata.resetcode =  resetcode;
            userdata.resetcodecreationtime =  new Date(),
            userdata.resetattemts =  currentattempts + 1;

             
            let maxtime = 0;
            if(lastresetcodetime && currentattempts) {
                console.log(lastresetcodetime, currentattempts)
                maxtime =  lastresetcodetime.valueOf()  + currentattempts * (30 * 1000) 
                console.log(maxtime, Date.now())
               
                if(maxtime > Date.now()) {
                    throw new Error('Unable to send link')
                }
            }

            const userobj =  usermodel(userdata);
            const inp =  await user_db.update_user({id: userobj.getId(), 
                resetcode: userobj.getResetCode(),
                resetcodecreationtime: userobj.getResetCodeCreationTime(),
                resetattemts: userobj.getResetAttemts()

            });

            console.log(`http://localhost:3992/api/authorize/changepassword?resetcode=${resetcode}&sid=${user.getId()}`)

            await message_service.email_util.SendEmail({
                from: 'info@kwapo.com',
                to: userobj.getEmail(),
                html: `
                <h1>You have requested to reset your password<h1>
                <p>To reset your password please visit this link http://localhost/api/authorize/userpasswordreset?resetcode=${resetcode} </p>
                <p>If you did not perform this action pleas report this to support</p>
                `,
                subject: 'Reset password request'
            });

            return {
                mailsent: true
            }
            

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  CreateResetLink;