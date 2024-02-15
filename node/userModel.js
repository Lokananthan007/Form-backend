// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  password: { type: String, select: false, required: true },
  confirmPassword: { type: String, select: false, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  agreeTerms: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', userSchema);
