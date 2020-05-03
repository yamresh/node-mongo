const User = require("../database/modals/User");
const bcrypt = require("bcrypt");
module.exports = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, user) => {
    console.log("user=============== ", user);
    if (user) {
      req.session.userId = user._id;
      bcrypt.compare(password, user.password, (err, result) => {
        console.log(" Error in store Login ", err.errors);
        console.log(" result ", result);
        if (result) {
          console.log(" result 1", result);

          return res.redirect("/");
        }
      });
    } else {
      return res.redirect("/user/login");
    }
  });
};
