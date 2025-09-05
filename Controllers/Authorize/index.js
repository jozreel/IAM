const AuthorizeController = require('./authorize-controller');
const {Authorize, AuthorizePost, Login, TwoFactor} =  require('../../UseCases/Authorize');
const PostAuthorizeController = require('./popst-authorize-controller');
const LoginController = require('./login-controller');
const TwoFactorController = require('./two-factor');

module.exports = Object.freeze({
    AuthorizeController: AuthorizeController({Authorize}),
    AuthorizePostController: PostAuthorizeController({AuthorizePost}),
    LoginController: LoginController({Login}),
    TwoFactorController: TwoFactorController({TwoFactor})
});