const mongoose = require("mongoose");

const User = mongoose.model("User");
const Trading = mongoose.model("Trading");

const compare = (a, b) => {
  const dateA = a.date;
  const dateB = b.date;

  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison * -1;
};

exports.index = (req, res) => {
  User.findById(req.session.id)
    .populate({
      path: "trading",
      model: Trading
    })
    .exec(function(err, user) {
      const isConnected = typeof req.session.id !== "undefined";
      res.render("historic", {
        trading: user.trading.sort(compare),
        isConnected
      });
    });
};
