const edge = require("edge.js");

module.exports = (req, res) => {
  req.session.destroy(() => {
    edge.global("auth", "");
    res.redirect("/");
  });
};
