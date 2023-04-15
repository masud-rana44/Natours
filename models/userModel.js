const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    require: [true, 'Please provide a password'],
    minlength: [8, 'Password must be 8 charecter long'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Please confirm your password'],
    validate: {
      // This will only work on SAVE and CREATE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password and Confirm Password are not same',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  // Only this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // Default: false, user not changed the password
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
