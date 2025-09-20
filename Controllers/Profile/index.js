const { GetProfile, GetProfilePost} = require("../../UseCases/Profile");
const GetProfileController = require("./get-profile-controller");
const PostProfileController = require("./post-profile-controller");

module.exports = Object.freeze({
    GetProfileController: GetProfileController({GetProfile}),
    PostProfileController: PostProfileController({GetProfilePost})
});