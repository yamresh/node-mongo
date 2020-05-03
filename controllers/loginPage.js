module.exports = (req, res) => {
  console.log(" Login poage ", req.session);
  const errList = req.session.errorRegisterList;
  res.render("login", {
    errors: errList,
  });
};
