const express = require("express");
const { config, engine } = require("express-edge");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const Post = require("./database/modals/Post");
const app = express();
const PORT = 3000;
const mongooseString =
  "mongodb+srv://nikki:nikki@cluster0-dbsge.gcp.mongodb.net/test?retryWrites=true&w=majority";
app.use(express.static("public"));
app.use(engine);
app.use(bodyParser.json());
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", `${__dirname}/views`);
mongoose.connect(mongooseString);

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  console.log("posts", posts);
  res.render("index", {
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  console.log("--- ", req.params.id);
  const post = await Post.findById(req.params.id);
  console.log("posts", post);
  res.render("post", {
    post: post,
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", (req, res) => {
  const { image } = req.files;
  image.mv(path.resolve(__dirname, "public/posts", image.name), () => {
    Post.create(
      {
        ...req.body,
        image: `/posts/${image.name}`,
      },
      (err, post) => {
        if (err) {
          res.send(" there is some error in data saving");
          res.statusCode = 400;
        }
        res.redirect("/");
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
