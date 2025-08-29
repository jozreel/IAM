const AuthorizeController = require('./authorize-controller');
const {Authorize, AuthorizePost, Login} =  require('../../UseCases/Authorize');
const PostAuthorizeController = require('./popst-authorize-controller');
const LoginController = require('./login-controller');

module.exports = Object.freeze({
    AuthorizeController: AuthorizeController({Authorize}),
    AuthorizePostController: PostAuthorizeController({AuthorizePost}),
    LoginController: LoginController({Login})
});