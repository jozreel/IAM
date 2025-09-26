const PasswordChangeSuccessPage = require("./password-change-success-page")
const {authorize_helpers} = require('../Helpers');
const GetPasswordChangeSuccessPage = ({user_db, verify_string}) => {
 
    return async (req) => {
        try {
        const cookies = req.cookies;
        const uidcookie =  cookies.sessionholdercookie;
        const session_cookie =  cookies.passwordchangesessioncookie;
        if(!session_cookie || !uidcookie) {
            throw new RangeError('Could not find the requested resource');
        }
       
        const session_holder =  authorize_helpers.decrypt_string(uidcookie)
        const user =  await user_db.get_user(session_holder);

        if(!user) {
            throw new RangeError('Could not fine the requested resource');
        }
        const date_cookie =  verify_string(user.lastpasswordchangedate, session_cookie);
        if(!date_cookie) {
            throw new RangeError('Could not fine the requested resource');
        }
        console.log('this')

        return PasswordChangeSuccessPage({message: 'Success! Your password was updated'});
        } catch (ex) {
          console.log(ex);
          return PasswordChangeSuccessPage({message: 'Oops! something went wrong'});
        }
    }

}
module.exports =  GetPasswordChangeSuccessPage;


