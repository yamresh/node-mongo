const path = require("path");

const Post = require("../database/modals/Post");

module.exports = (req, res) => {
  const { image } = req.files;
  image.mv(path.resolve(__dirname, "..", "public/posts", image.name), () => {
    Post.create(
      {
        ...req.body,
        image: `/posts/${image.name}`,
        author: req.session.userId,
      },
      (err, post) => {
        if (err) {
          console.log(" err in store post ", err);
          res.send(" there is some error in data saving");
          res.statusCode = 400;
        } else {
          res.redirect("/");
        }
      }
    );
  });
};
