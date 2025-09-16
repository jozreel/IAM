const AuthorizeController = require('./authorize-controller');
const {Authorize, AuthorizePost, Login, TwoFactor, Consent, Logout} =  require('../../UseCases/Authorize');
const PostAuthorizeController = require('./popst-authorize-controller');
const LoginController = require('./login-controller');
const TwoFactorController = require('./two-factor');
const ConsentController =  require('./consent');
const LogoutController = require('./logout-controller');

module.exports = Object.freeze({
    AuthorizeController: AuthorizeController({Authorize}),
    AuthorizePostController: PostAuthorizeController({AuthorizePost}),
    LoginController: LoginController({Login}),
    TwoFactorController: TwoFactorController({TwoFactor}),
    ConsentController: ConsentController({Consent}),
    LogoutController: LogoutController({Logout})
});