const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


exports.verifyJWT = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log('Cookies', req.cookies, token);
    
    if (!token) {
        throw new ApiError(400, "Unauthorized user");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log('Decoded', decodedToken);
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        console.log("User from verifyJWT: ", user);
        
        if (!user) {
            throw new ApiError(410, "Invalid Access token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})

