const create_application =  require('./application');
const fd = require('../../FD');
const createUTCDate = fd.date_utils.createUTCDate;
const generateAPIKey =  fd.access_utils.jwt;
const verifyToken = fd.access_utils.verify_token;
module.exports = create_application({createUTCDate, generateAPIKey, verifyToken});