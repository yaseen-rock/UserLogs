const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  loginTime: Date,
  messages: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
