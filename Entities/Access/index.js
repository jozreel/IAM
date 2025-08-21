const {date_utils} =  require('../../FD');
const create_access_factory = require('./access');
console.log(date_utils)
module.exports = create_access_factory({CreateUtcDate: date_utils.createUTCDate})