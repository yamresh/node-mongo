const validateDate = (req, res, next) => {
  const isValid =
    !req.files ||
    !req.body.username ||
    !req.body.title ||
    !req.body.description ||
    !req.body.content;
  console.log("validateDate -- > ", isValid);

  if (isValid) {
    return res.redirect("/posts/new");
  }

  next();
};

module.exports = validateDate;
