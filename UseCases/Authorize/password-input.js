const PasswordChangeSuccessPage = require("./password-change-success-page");
const PasswordInputPage = require("./password-input-page")

const GetPasswordInput = ({user_db}) => {
    return async (req) => {
        try {
        const {sid, resetcode} =  req.query;
        const user =  await user_db.get_user(sid);
        if(!user) {
            throw new RangeError('Not found')
        }
        const ccode =  user.getResetCode();
        if(ccode !== resetcode) {
            throw new RangeError('Requested resource not found');
        }

        return PasswordInputPage(req.query || {});
        }catch (ex) {
            console.log(ex);
            return PasswordChangeSuccessPage({message: '404 Could not find this resource'});
        }
    }
}

module.exports =  GetPasswordInput;