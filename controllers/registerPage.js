module.exports = (req, res) => {
  const errList = req.flash("errorRegisterList");
  console.log("Register Page error ", errList);
  res.render("register", {
    errors: errList,
  });
};
