module.exports = (req, res) => {
  const errList = req.flash("errorRegisterList");
  res.render("login", {
    errors: errList,
  });
};
