exports.index = (req, res) => {
  const isConnected = typeof req.session.id !== "undefined";
  console.log(isConnected);


  res.render("login", { isConnected });
};
