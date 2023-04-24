const user_service =  require('../../UseCases/User');
const post_user_controller =  require('./post-user-controller');
const patch_user_controller = require('./patch-user-controller');
const list_user_controller =  require('./list-users-controller');
const get_user_controller = require('./get-user-controller');
const delete_user_controller =  require('./delete-user-controller');
const generate_code_controller = require('./generate-code-controller');
const process_code_controller = require('./process-code-controller');
const save_profile_pic_controller = require('./save-profilepic-controller');
const get_profile_pic_controller = require('./get-profilepic-controller');
const generate_reset_link_controller = require('./generate-reset-link-controller');
const reset_password_controller = require('./reset-password-controller');
const check_reset_link_controller = require('./check-reset-link-controller');

const add_user = user_service.add_user;
const update_user =  user_service.update_user;
const list_users =  user_service.list_users;
const get_user = user_service.get_user;
const delete_user =  user_service.delete_user;
const generate_code =  user_service.generate_code;
const process_code =  user_service.process_code;
const save_profile_pic = user_service.save_profile_pic;

module.exports = Object.freeze({
    post_use: post_user_controller({add_user}),
    patch_user: patch_user_controller({update_user}),
    list_users: list_user_controller({list_users, get_user}),
    get_user: get_user_controller({get_user}),
    delete_user: delete_user_controller({delete_user}),
    generate_code: generate_code_controller({generate_code}),
    proces_code: process_code_controller({process_code}),
    save_profile_pic: save_profile_pic_controller({save_profile_pic}),
    get_profile_pic: get_profile_pic_controller({get_profilepic: user_service.get_profile_pic}),
    generate_reset_link: generate_reset_link_controller({generate_reset_link: user_service.generate_reset_link}),
    reset_password: reset_password_controller({reset_password: user_service.reset_password}),
    check_reset_code: check_reset_link_controller({check_reset_link: user_service.check_password_reset_code})
});