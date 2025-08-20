const create_application =  require('./application');
const fd = require('../../FD');
const createUTCDate = fd.date_utils.createUTCDate;
const generateAPIKey =  fd.access_utils.generate_apikey;
const verifyKey = fd.access_utils.verify_string;
const hashKey =  fd.access_utils.hash_string;
module.exports = create_application({createUTCDate, generateAPIKey, verifyKey, hashKey});