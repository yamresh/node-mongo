module.exports = (req, res) => {
  console.log(" Contact page ", req.session.userId);
  if (req.session.userId) {
    res.render("contact");
  } else {
    res.redirect("/user/login");
  }
};
