const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        maxlength:50,
        required: true
    },
    email: {
        type:String,
        trim:true,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
})

const User = mongoose.mnodel("User", userSchema)

module.exports = User