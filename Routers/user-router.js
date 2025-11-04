const {Router, json} =  require('express');
const multer = require('multer');
const request_handler =  require('../FD').request_handler;
const file_request_handler = require('../FD').file_request_handler;
const user_controller =  require('../Controllers/User');
const user_router =  Router();
const storage =  multer.diskStorage({
    destination: function (req, file,cb){
        cb(null, process.env.UPLOADPATH)
    },
    filename: function (req, file, cb) {
        const uid =  req.params.id;
        const now = Date.now();
        const filename = `${uid}-${now}-${file.originalname}`;
       console.log(file, 'thefile');
        cb(null, filename)

    }
});

const upload = multer({storage:storage});

user_router.post('/', json(), request_handler(user_controller.post_use));
user_router.patch('/:id', json(), request_handler(user_controller.patch_user));
user_router.get('/checkresetcode', request_handler(user_controller.check_reset_code));
user_router.get('/:id', request_handler(user_controller.get_user));
user_router.get('/', request_handler(user_controller.list_users));
user_router.delete('/:id', request_handler(user_controller.delete_user));
user_router.patch('/generatecode/:id', request_handler(user_controller.generate_code));
user_router.patch('/processcode/:id', json(), request_handler(user_controller.proces_code));
user_router.patch('/profilepic/:id', upload.single('file'),request_handler(user_controller.save_profile_pic));
user_router.patch('/resetlink/:id', json(), request_handler(user_controller.generate_reset_link));
user_router.patch('/resetpassword/:id', json(), request_handler(user_controller.reset_password))
user_router.get('/profilepic/:id', file_request_handler(user_controller.get_profile_pic));
user_router.post('/role/:id', json(), request_handler(user_controller.assign_role_to_user))
module.exports =  user_router;