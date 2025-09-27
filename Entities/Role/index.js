const create_role = require('./role');
const {date_utils}=  require('../../FD');
const createTenantRoleFactory = require('./tenant-role');


module.exports = {AppRole: create_role({CreateUtcDate: date_utils.createUTCDate}), TenantRole: createTenantRoleFactory({CreateUtcDate: date_utils.createUTCDate})}
