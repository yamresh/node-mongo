const Post = require("../database/modals/Post");

module.exports = async (req, res) => {
  const posts = await Post.find({});
  console.log(" User session ", req.session);
  res.render("index", {
    posts: posts,
  });
};
