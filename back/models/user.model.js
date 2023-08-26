const mongoose = require('mongoose');
// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  bio: { type: String, maxlength: 200 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});



const User = mongoose.model('User', userSchema);


module.exports = { User};
