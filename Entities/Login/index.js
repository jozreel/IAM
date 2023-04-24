const create_login = require('./login');
const createUTCDate =  require('../../FD').date_utils.createUTCDate;
const createToken = require('../../FD').access_utils.jwt;
module.exports =  create_login({createUTCDate, createToken});