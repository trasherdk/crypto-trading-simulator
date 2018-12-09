
/* !
 * Module dependencies
 */

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

/**
 * User schema
 */
const WalletSchema = new Schema({
  currency: { type: String, default: 'euros' },
  currency_qty: { type: Schema.Types.Number, default: 0 },
  cryptos: [{
    currency:{ type: String, default: '' },
    currency_qty: { type: Schema.Types.Number, default: 0 },
    currency_price: { type: Schema.Types.Number, default: 0 }
  }]
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

WalletSchema.method({

});

/**
 * Statics
 */

WalletSchema.static({

});

/**
 * Register
 */

mongoose.model('Wallet', WalletSchema);
