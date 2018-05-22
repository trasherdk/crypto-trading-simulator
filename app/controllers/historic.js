

const data = [];
data.push({

});

exports.index = (req, res) => {
  const isConnected = typeof req.session.id !== "undefined";
  res.render('historic', { isConnected, data });
};