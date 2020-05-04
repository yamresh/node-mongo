module.exports = (req, res) => {
  console.log(" Create Post page ", req.session.userId);

  if (req.session.userId) {
    res.render("create");
  } else {
    res.redirect("/user/login");
  }
};
