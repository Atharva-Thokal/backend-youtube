//there is an issue in uploading files locally but they are uploaded at cloudinary

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    //for writting a controller break-down it into smaller taskes
    //taskes for registering a user are as follows:

    //refer user model to get info of all fields
    //get user details from frontend
    //validation- datafields are not empty, email is in correct format
    //check if user already exists- based on username and email
    //check for images and avatar
    //upload them on cloudinary, avatar success or not
    //create user object - create entry in db
    //when you create a entry you get a response as it is including all info filled while entry
    //remove password and refresh token field from response
    //check for user response
    //return response

    const {username, email, password, fullName} = req.body// got details from frontend
    // console.log("email: ", email);

    //validation for empty
    if([username, email, password, fullName].some((field) => field.trim() === "")){
        throw new ApiError(400, "All fields are required!")
    }

    //check if user or email allready exists
    const existedUser = await User.findOne(
        {
            $or: [{ username }, { email }]
        })// User comes from user model User(can talk to db) has power to search from database as made using mongoose.model 
    if(existedUser){
        throw new ApiError(409, "user with username or email already exists")
    }
    
    // console.log(req.body)
    // console.log(req.files)

    //check image on local path multer helps in giving local path
    const avatarLocalPath = req.files?.avatar[0]?.path; //optional chaining (?.) ensures that if any intermediate property is null or undefined, the expression short-circuits and returns undefined
    
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file required")
    } 

    //upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file required")

    } 

    //create obj - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser) throw new ApiError(500, "something went wrong while registering a user")

    //send res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export {registerUser}