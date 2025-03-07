const mongoose = require('mongoose')
const validator = require('validator') //validation
const bcrypt = require('bcrypt') //password hashing
const jwt = require('jsonwebtoken') //token auth

//schema
const userSchema = new mongoose.Schema({
avatar : {
type:Buffer
},
    role: {
        type:String,
        required:true,
        enum: ['Standard User','Organizer','System Admin'],
        default:'Standard User'
    },
    name:{
        
        type:String,
        required: true,
        trim:true

    }, email:{
   type:String,
   unique:true,
   required:true,
   trim:true,
   lowercase:true,
   validate(value) {
    if(!validator.isEmail(value)){
        throw new Error('Invalid email')
    }
   }
    },
    
        
    password: {
        required:true,
        type:String,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Your password cannot contain the word:"password"')
            }
        },

    },
    tokens: [{
        token : {
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

//method for authentication to generate tokens
userSchema.methods.generateAuthToken = async function () {
 const user = this
 const token = jwt.sign({_id: user._id.toString()},'uni-project')
 user.tokens = user.tokens.concat({token})
 await user.save()
 return token
}

//encrypting passwords before saving
userSchema.pre('save',async function (next){
const user = this
if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password,8)

    next()
}
})

//login function
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) {
        throw new Error('unable to login')
    }


    return user
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    
    return userObject
    }

//linking events to organizer not stored in the database
userSchema.virtual('events',{
    ref:'Event',
    localField:'_id',
    foreignField:'owner' 
})

userSchema.virtual('bookings',{
    ref:'Booking',
    localField:'_id',
    foreignField:'user'
})



//creating model
const User = mongoose.model('User',userSchema)

module.exports = User


