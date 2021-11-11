const mongoose = require('mongoose');

const userSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        required: true
    }
})

const Userdb = mongoose.model('User', userSchemas);

module.exports = {Userdb};