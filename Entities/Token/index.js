const {date_utils}= require('../../FD')
const token_factory = require('./token');

module.exports = token_factory({CreateUtcDate: date_utils.createUTCDate})