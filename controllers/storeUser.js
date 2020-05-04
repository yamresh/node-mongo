const User = require("../database/modals/User");

module.exports = (req, res) => {
  console.log("==========", req.body);
  User.create(
    {
      ...req.body,
    },
    async (err, user) => {
      if (err) {
        const errList = Object.keys(err.errors).map((key) => {
          // const path = err.errors[key].path;
          return err.errors[key].message;
          /* return {
            [path]: errMessage,
          }; */
        });
        console.log("Error in saving data", errList);
        req.flash("errorRegisterList", errList);
        // res.statusCode = 400;
        res.redirect("/user/register");
        //  return res.json({ error: errList });
      } else {
        res.redirect("/");
      }
    }
  );
};
