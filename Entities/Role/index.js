const create_role = require('./role');
const {date_utils}=  require('../../FD');


module.exports = create_role({CreateUtcDate: date_utils.createUTCDate})
