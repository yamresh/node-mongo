const Post = require("../database/modals/Post");

module.exports = async (req, res) => {
  const posts = await Post.find({});

  res.render("index", {
    posts: posts,
  });
};
