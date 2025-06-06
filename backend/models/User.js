const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    profilePicture: String,
    birthdate: Date,
    phone: String
});

module.exports = mongoose.model('User', UserSchema);
