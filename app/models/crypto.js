
/* !
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */
const CryptoSchema = new Schema({
  currency: { type: String, default: '' },
  euro_value: { type: Schema.Types.Number, default: 0 }
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

CryptoSchema.method({

});

/**
 * Statics
 */

CryptoSchema.static({

});

/**
 * Register
 */

mongoose.model('Crypto', CryptoSchema);
