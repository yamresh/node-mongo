const User = require("../database/modals/User");

module.exports = (req, res) => {
  console.log("==========", req.body);
  User.create(
    {
      ...req.body,
    },
    async (err, user) => {
      const users = await User.find({});
      console.log(" ======= User Created ===============\n", users);
      {
        if (err) {
          res.send(" there is some error in data saving");
          res.statusCode = 400;
        }
        res.redirect("/");
      }
    }
  );
};
