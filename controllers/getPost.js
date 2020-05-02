const Post = require("../database/modals/Post");

module.exports = async (req, res) => {
  console.log("--- ", req.params.id);
  const post = await Post.findById(req.params.id);
  console.log("posts", post);
  res.render("post", {
    post: post,
  });
};
