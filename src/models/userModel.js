const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  userRoles: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  confirmToken: { type: String },
  isConfirmed: { type: Boolean, default: false }
}, {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      }
    }
  });
  
module.exports = mongoose.model('User', userSchema);