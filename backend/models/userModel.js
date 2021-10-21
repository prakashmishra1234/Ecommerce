const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Name can not exceed 30 characters'],
        minlength: [4, 'Name should have more than 4 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Password should contain minimum 8 character'],
        select: false
    },
    avatar: {
        public_id: {
            type:String,
            required:true
        },
        url: {
            type:String,
            required:true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//Password Hashing
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');    //generating token
//Hashing and adding resetpasswordtoken to userschema
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);