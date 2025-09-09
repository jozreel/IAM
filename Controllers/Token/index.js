const TokenService =  require('../../UseCases/Token');
const AddTokenController = require('./add-token-controller');
const RefreshTokenController = require('./refresh-token-controller');

module.exports =  Object.freeze({
    AddTokenCOntrooller: AddTokenController({TokenService}),
    RefreshTokenContriller: RefreshTokenController({TokenService})
});