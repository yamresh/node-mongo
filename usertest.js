const mongoose = require("mongoose");
const User = require("./database/modals/User");

const mongooseString =
  "mongodb+srv://nikki:nikki@cluster0-dbsge.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongooseString, () => {
  console.log(" Connected to mongo db");
});

User.find({}, (error, user) => {
  console.log(error + " --- " + user);
});

User.findOne({ username: "user001" }, (error, user) => {
  console.log(error + " findOne  --- " + user);
});
