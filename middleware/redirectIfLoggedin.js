module.exports = (req, res, next) => {
  console.log("Process redirectIfLoggedin ");
  if (req.session.userId) {
    return res.redirect("/");
  }

  next();
};
