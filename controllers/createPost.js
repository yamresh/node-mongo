module.exports = (req, res) => {
  if (req.session.userId) {
    res.render("create");
  } else {
    res.redirect("/user/login");
  }
};
