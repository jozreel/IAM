const AuthorizeController = require('./authorize-controller');
const {Authorize, AuthorizePost, Login, TwoFactor, Consent, Logout, Register, ResendCode, GetResetPasswordPage, CreateResetLink, GetPasswordInput, GetPasswordChangeSuccessPage, ChangePassword} =  require('../../UseCases/Authorize');
const PostAuthorizeController = require('./popst-authorize-controller');
const LoginController = require('./login-controller');
const TwoFactorController = require('./two-factor');
const ConsentController =  require('./consent');
const LogoutController = require('./logout-controller');
const RegisterController = require('./register-controller');
const ResendCodeController = require('./resend-code-controller');
const ResetPasswordPageController = require('./reset-password-page-controller');
const GenerateResetLinkController = require('./generate-reset-link-controller');
const PasswordInputPageController = require('./password-input-page');
const GetPasswordSuccessPageController = require('./get-password-change-success-page=controller');
const ChangePasswordController = require('./change-password-controller');

module.exports = Object.freeze({
    AuthorizeController: AuthorizeController({Authorize}),
    AuthorizePostController: PostAuthorizeController({AuthorizePost}),
    LoginController: LoginController({Login}),
    TwoFactorController: TwoFactorController({TwoFactor}),
    ConsentController: ConsentController({Consent}),
    LogoutController: LogoutController({Logout}),
    RegisterController: RegisterController({Register}),
    ResendCodeController: ResendCodeController({ResendCode}),
    ResetPasswordPageController: ResetPasswordPageController({GetResetPasswordPage}),
    GenerateResetLinkController: GenerateResetLinkController({CreateResetLink}),
    PasswordInputPageController: PasswordInputPageController({GetPasswordInput}),
    ChangePasswordController: ChangePasswordController({ChangePassword}),
    GetPasswordSuccessPageController: GetPasswordSuccessPageController({GetPasswordChangeSuccessPage})
});