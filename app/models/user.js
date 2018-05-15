
/* !
 * Module dependencies
 */

const mongoose = require('mongoose');
// const userPlugin = require('mongoose-user');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

/**
 * User schema
 */
const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  salt: { type: String, default: '' },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
  trading: [{ type: Schema.Types.ObjectId, ref: 'Trading' }]
});

/**
 * User plugin
 */

// UserSchema.plugin(userPlugin, {});
UserSchema.plugin(passportLocalMongoose);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({

});

/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */

mongoose.model('User', UserSchema);
