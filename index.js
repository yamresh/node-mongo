require("dotenv").config();
const express = require("express");
const { config, engine } = require("express-edge");
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const morgan = require("morgan");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");
const edge = require("edge.js");
const cloudinary = require("cloudinary");
const Post = require("./database/modals/Post");

// Pages
const validateDate = require("./middleware/validateDate");
const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const aboutPageController = require("./controllers/aboutPage");
const contactPageController = require("./controllers/contactPage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const registerController = require("./controllers/registerPage");
const storeUserController = require("./controllers/storeUser");
const loginPageController = require("./controllers/loginPage");
const loginUserController = require("./controllers/storeLogin");
const logoutPageController = require("./controllers/logoutPageController");
const auth = require("./middleware/auth");
const redirectIfLoggedin = require("./middleware/redirectIfLoggedin");

const app = express();
const PORT = process.env.PORT;
const mongooseString = process.env.MONGO_URI;
app.use(express.static("public"));
app.use(engine);
app.use(bodyParser.json());
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", `${__dirname}/views`);
const mongoStore = connectMongo(expressSession);
mongoose.connect(mongooseString, () => {
  console.log("========== Connected to Mongo db server ============");
});

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(connectFlash());
app.use("/", (req, res, next) => {
  console.log(" req.session.userId ", req.session.userId);
  if (req.session && req.session.userId) {
    edge.global("auth", req.session.userId);
  }

  next();
});
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

app.get("/posts/new", auth, createPostController);

app.post("/posts/store", auth, storePostController);

app.get("/user/register", registerController);

app.post("/user/register", redirectIfLoggedin, storeUserController);

app.get("/user/login", loginPageController);

app.post("/user/login", redirectIfLoggedin, loginUserController);

app.get("/user/logout", logoutPageController);

app.use((req, res) => res.render("404"));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
