const User = require("../database/modals/User");

module.exports = (req, res, next) => {
  User.findOne(req.session.userId, (err, data) => {});
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/user/login");
  }
};
