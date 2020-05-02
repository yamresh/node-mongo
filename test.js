const mongoose = require("mongoose");
const Post = require("./database/modals/Post");

const mongooseString =
  "mongodb+srv://nikki:nikki@cluster0-dbsge.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongooseString);

/* Post.find({}, (error, posts) => {
  console.log(error + " --- " + posts);
}); */

Post.findByIdAndUpdate(
  "5ead5055b21b0d61320cb507",
  {
    title: "This is update programatically from code",
  },
  (error, post) => {
    console.log(error + " --- " + post);
  }
);

Post.findById("5ead5055b21b0d61320cb507", (error, posts) => {
  console.log(error + " --- " + posts);
});
/* Post.create(
  {
    title: "My First Blog Post",
    description: "Blog descriptions ",
    content: "Loren ipsum contentt",
  },
  (error, post) => {
    console.log(error + " -- ", post);
  }
);
 */
