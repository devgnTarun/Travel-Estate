const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : [3, 'Minimum name length should be 3']
    },
    email : {
        type  : String,
        unique : [true, 'User already exists with this email'],
        required : true,
        validate : [validator.isEmail , 'Enter valid email']
    },
    password : {
        type : String,
        minLength : [8 , 'Minimum password lenght should be 8'],
        required : true,
        select : false
    },
    avatar : {
            public_id: {
              type: String,
              required: true,
            },
            url: {
              required: true,
              type: String,
          },
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    verified : {
        type : Boolean,
        default : false
    }
}, { timestamps: true })

// Password hash
userSchema.pre('save' , async function (next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword , this.password)
}

//Get jwt token 
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id ,  type : 'user' } , process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
  };

module.exports = mongoose.model('User', userSchema)
