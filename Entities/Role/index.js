const create_role = require('./role');
const {date_utils}=  require('../../FD');
const createTenantRoleFactory = require('./tenant-role');
const RolesApplication = require('./roles-application');
const RolesUsers = require('./roles-users');


module.exports = {
    AppRole: create_role({CreateUtcDate: date_utils.createUTCDate}),
    TenantRole: createTenantRoleFactory({CreateUtcDate: date_utils.createUTCDate}),
    RolesApplication: RolesApplication({createUTCDate: date_utils.createUTCDate}),
    RolesUsers: RolesUsers()
   }
