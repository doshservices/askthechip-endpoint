const Post = require("../services/post");
const { success, error } = require("../utils/baseController");

module.exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const newPost = await new Post({ userId, ...req.body }).createPost();
    return success(res, { newPost }, "post created successfully");
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getAllPost = async (req, res) => {
  try {
    const post = await new Post().getPost();
    return success(res, { post }, "post created successfully");
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getPostById = async (req, res) => {
  try {
    const post = await new Post({ postId: req.params.postId }).getPostById();
    return success(res, { post });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getUserPost = async (req, res) => {
  try {
    const post = await new Post({ userId: req.params.userId }).getUserPost();
    return success(res, { post });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const userId = req.user.id,
      postId = req.query.postId;
    const post = await new Post({ userId, postId, ...req.body }).updatePost();
   if (post) return success(res, { post });
    return error(res, { code: 400, message: "Access Denied You Can't Edit This Post"});
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const userId = req.user.id,
      postId = req.query.postId;
    const post = await new Post({ userId, postId }).deletePost();
   if (post) return success(res, { post });
   return error(res, { code: 400, message: "Access Denied You Can't Delete This Post" });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};
