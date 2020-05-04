const Post = require("../database/modals/Post");

module.exports = async (req, res) => {
  console.log(" req.session from controller ", req.session.userId);

  const posts = await Post.find({});
  console.log(" User session ", req.session);
  res.render("index", {
    posts: posts,
  });
};
