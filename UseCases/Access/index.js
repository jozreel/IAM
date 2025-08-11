const add_access = require("./add-access");
const {access_db} =  require('../../DataDrivers/MongoDB');
const update_access = require("./update-access");
const list_access = require("./list_access");
const get_access = require("./get-access");
const delete_access = require("./delete_access");

module.exports = Object.freeze({
    AddAccess: add_access({access_db}),
    UpdateAccess: update_access({access_db}),
    ListAccess: list_access({access_db}),
    GetAccess: get_access({access_db}),
    DeleteAccess: delete_access({access_db})
});