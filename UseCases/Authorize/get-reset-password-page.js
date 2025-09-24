const  ResetPasswordPage  = require("./reset-password-page")

const GetResetPasswordPage = () => {
    try {
    return (req) => {
        console.log(req)
        return ResetPasswordPage(req.data || {});
    }
} catch (ex) {
    console.log(ex);
    throw ex;
}
}

module.exports =  GetResetPasswordPage;