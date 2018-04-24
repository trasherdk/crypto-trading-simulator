
/* !
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */
const WalletSchema = new Schema({
  currency: { type: String, default: 'euros' },
  currency_qty: { type: Schema.Types.Number, default: 0 },
  crypto_currency: [{ type: Schema.Types.ObjectId, ref: 'Crypto' }]
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
