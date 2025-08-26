const AuthorizeController = require('./authorize-controller');
const {Authorize} =  require('../../UseCases/Authorize');

module.exports = Object.freeze({
    AuthorizeController: AuthorizeController({Authorize})
});