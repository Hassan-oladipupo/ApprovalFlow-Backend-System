const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userRoles: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
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
