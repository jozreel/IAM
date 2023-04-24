const create_user =  require('./user');
const fd =  require('../../FD');
const createUTCDate =  fd.date_utils.createUTCDate;
const verify_token =  fd.access_utils.verify_token;
module.exports =  create_user({createUTCDate, verify_token});