exports.index = (req, res) => {
  const isConnected = typeof req.session.id !== "undefined";
  res.render("profile", { isConnected });
};
