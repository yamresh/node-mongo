module.exports = (req, res) => {
  if (req.session.userId) {
    res.render("contact");
  } else {
    res.redirect("/user/login");
  }
};
