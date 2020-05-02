const express = require("express");
const { config, engine } = require("express-edge");
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const morgan = require("morgan");

const Post = require("./database/modals/Post");
const validateDate = require("./middleware/validateDate");
const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const aboutPageController = require("./controllers/aboutPage");
const contactPageController = require("./controllers/contactPage");

const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

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

// Logger
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/posts/store", validateDate);

app.get("/", homePageController);

app.get("/about", aboutPageController);

app.get("/contact", contactPageController);

app.get("/post/:id", getPostController);

app.get("/posts/new", createPostController);

app.post("/posts/store", storePostController);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
