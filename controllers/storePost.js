const path = require("path");
const cloudinary = require("cloudinary");
const Post = require("../database/modals/Post");

module.exports = (req, res) => {
  const { image } = req.files;
  const uploadPath = path.resolve(__dirname, "..", "public/posts", image.name);
  image.mv(path.resolve(uploadPath), () => {
    console.log("image");
    cloudinary.v2.uploader.upload(uploadPath, (err, result) => {
      console.log(
        "cloudinarycloudinarycloudinarycloudinarycloudinarycloudinarycloudinary"
      );
      if (result) {
        Post.create(
          {
            ...req.body,
            image: `${result.secure_url}`,
            author: req.session.userId,
          },
          (err, post) => {
            if (err) {
              console.log(" err in store post ", err);
              res.send(" there is some error in data saving");
              res.statusCode = 400;
            } else {
              console.log("post", post);
              res.redirect("/");
            }
          }
        );
      } else if (err) {
        console.log("Err in uploading ", err);
      }
    });
  });
};
