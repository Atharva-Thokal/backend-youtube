import mongoose, { Schema } from "mongoose";
import  Jwt  from "jsonwebtoken"; // jwt is a bearer token it is like a key
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // trim removes whitespaces
        index: true // if you want to make any field searchable make in index: true but puts heavy toll on performance so use it wisely 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,//cloudinary url
        required: true
    },
    coverImage: {
        type: String,// cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "password required"]
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

//for password incryption 
// keep the below funciton async as hashing takes time
userSchema.pre("save", async function (next) { // pre requires two things one is when to call here it is just before "save", second is a function to be executed
    if(!this.isModified("password")) return next() // this line checkes weather password is not modified if modified then only incrypt the password

    this.password = await bcrypt.hash(this.password, 10)// hash requires 2 things one is what to incrypt and second is how many rounds of hashing or salts
    next()// this next is imp to pass as it moves the control of this middelware to next 
})

userSchema.methods.isPasswordCorrect = async function (passoword) {

    return await bcrypt.compare(passoword, this.passoword)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign
    (
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
            
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign
    (
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
            
    )
}

export const User = mongoose.model("User", userSchema);