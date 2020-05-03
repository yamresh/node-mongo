const User = require("../database/modals/User");

module.exports = (req, res) => {
  console.log("==========", req.body);
  User.create(
    {
      ...req.body,
    },
    async (err, user) => {
      const users = await User.find({});
      console.log(user, " ======= User Created ===============\n", users);

      if (err) {
        console.log("Error in saving data", err);
        res.statusCode = 400;

        return res.json({ error: err });
      }
      res.redirect("/");
    }
  );
};
