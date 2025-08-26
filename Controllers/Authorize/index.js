const AuthorizeController = require('./authorize-controller');
const {Authorize, AuthorizePost} =  require('../../UseCases/Authorize');
const PostAuthorizeController = require('./popst-authorize-controller');

module.exports = Object.freeze({
    AuthorizeController: AuthorizeController({Authorize}),
    AuthorizePostController: PostAuthorizeController({AuthorizePost})
});