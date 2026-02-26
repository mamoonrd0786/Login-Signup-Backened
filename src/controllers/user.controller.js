const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
// const emailService = require("../services/email.service.js");
const jwt = require("jsonwebtoken");

async function generateAccessAndRefreshTokens(userId) {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateJSONWebToken();
        const refreshToken = user.generateRefreshJSONWebToken();

        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log("Error", error);

        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh tokens ",
        );
    }
}


// Signup controller

exports.signup = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    // Existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // Create user
    const user = await User.create({
        username: username,
        email: email,
        password: password,
        role: role,
    });

    const createdUser = await User.findById(user._id).select("-password");
    // console.log(createdUser);
    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user !!",
        );
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"));

    // await emailService.sendRegistrationEmail(user.email, user.username);
});

// Login Page
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // if password does not match then res[et your password through registered email

    const user = await User.findOne({ $or: [{ email }] });
    if (!user) {
        throw new ApiError(404, "User is not existed. Sign Up Please !!");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);
    if (!isPasswordMatch) {
        return res.status(401).json(new ApiError(409, "Invalid credentials !!"));
    }

    const options = {
        httpOnly: true,
        secure: true,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id,
    );
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(user, 200, "Congrats! Log In Successfull"));
});

exports.logout = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            refreshToken: undefined,
        },
        {
            new: true,
        },
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse({}, 200, "User logged out"));
});

// Controller of refreshToken

exports.refreshTokenAgain = asyncHandler(async (req, res, next) => {
    const incommingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRefreshToken) {
        throw new ApiError(401, "Refresh token not valid");
    }
    try {
        const decodedToken = jwt.verify(
            incommingRefreshToken,
            process.env.JWT_REFRESH_KEY,
        );
        const user = await User.findById(decodedToken?._id);

        if (user.refreshToken !== incommingRefreshToken) {
            throw new ApiError(400, "User not verified !!");
        }

        const { accessToken, newrefreshToken } = generateAccessAndRefreshTokens(
            user._id,
        );

        user.refreshToken = newrefreshToken;
        user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .cookie("refreshToken".newrefreshToken, options)
            .cookie("accessToken".accessToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken: accessToken,
                        refreshToken: newrefreshToken,
                    },
                    "Refreshe token refreshed again",
                ),
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "User is not authenticated");
    }
});

// Controller for updatePassword

exports.updateUserPassword = asyncHandler(async function (req, res) {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        throw new ApiError(
            401,
            "New password does not match with confirm password",
        );
    }
    // const incomingrefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    // if (!incomingrefreshToken) {
    //     throw new ApiError(401, "User is not valid!!")
    // }

    // const decodedToken = jwt.verify(incomingrefreshToken, process.env.JWT_REFRESH_KEY);

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Please enter valid credentials");
    }

    user.password = newPassword;
    user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Your password changed successfull"));
});

exports.deleteUser = asyncHandler(async function (req, res) {
    const user = await User.findByIdAndDelete(req.user._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(201, "User is not existed");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User delete successfully"));
});


exports.currentUser = asyncHandler(async function (req, res) {
    const user = await User.findById(req.user._id).select("-password, -refreshToken");

    if (!user) {
        throw new ApiError(204, "User already logged out")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "This user is logged in")
        )
})

// Get all users using pagination & search

exports.getAllUsers = asyncHandler(async function (req, res) {

    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
        $or: [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ]
    }

    const total = await User.countDocuments(query);

    const users = await User.find(query).skip(skip).limit(limit).select("-password");

    return res.status(200).json(
        new ApiResponse(200, { total, limit, page, skip, totalPage: Math.ceil(total / limit), users }, "Users here")
    )

})
