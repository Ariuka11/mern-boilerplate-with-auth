const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
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
    // role: {
    //     type: Number,
    //     default: 0
    // }
})


userSchema.pre('save', function( next ) {
    var user = this;
    
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err) return next(err);
        user.password = hash 
        next()
    })
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

const User = mongoose.model("User", userSchema)

module.exports = User