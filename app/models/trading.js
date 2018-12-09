
/* !
 * Module dependencies
 */

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

/**
 * User schema
 */
const TradingSchema = new Schema({
  src_currency: { type: String, default: 'euros' },
  src_value: { type: Schema.Types.Number, default: 0 },
  src_price: { type: Schema.Types.Number, default: 0 },
  dst_currency: { type: String, default: 'euros' },
  dst_value: { type: Schema.Types.Number, default: 0 },
  date: { type: Schema.Types.Date }
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

TradingSchema.method({

});

/**
 * Statics
 */

TradingSchema.static({

});

/**
 * Register
 */

mongoose.model('Trading', TradingSchema);
