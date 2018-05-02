const mongoose = require('mongoose');

const Trading = mongoose.model('Trading');
const User = mongoose.model('User');

exports.index = (req, res) => {
    User.findById(req.session.id, function (err, user) {
        let tradeList = user.trading;
        res.send(tradeList);
    });
};

exports.add = (req, res) => {
    let trade = new Trading({
        src_currency:req.body.src_currency,
        src_value:req.body.src_value,
        dst_currency:req.body.dst_currency,
        dst_value:req.body.dst_value
    });

    trade.save(function (err) {
        if (err) console.error(err);
    });

    User.update(
        { _id: req.session.id },
        { $push: { trading: trade } }
    );

    res.send('Trade add');
};
