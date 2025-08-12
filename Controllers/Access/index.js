const {AddAccess, UpdateAccess, GetAccess, ListAccess, DeleteAccess} =  require('../../UseCases/Access');
const DeleteAccesController = require('./delete-access-controller');
const GetAccessController = require('./get-access-controiller');
const ListaccessController = require('./list-access-controller');
const PostAccessController = require('./post-access-controller');
const PutAccessController = require('./put-access-controller');
mosule.exports =  Object.freeze({
    PostAccessController: PostAccessController({AddAccess}),
    PutAccessController: PutAccessController({UpdateAccess}),
    GetAccessController: GetAccessController({GetAccess}),
    ListaccessController: ListaccessController({ListAccess}),
    DeleteAccesController: DeleteAccesController({DeleteAccess})
});