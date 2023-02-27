const User = require("../services/user");
const { success, error } = require("../utils/baseController");
const { generateAuthToken } = require('../core/userAuth');
const { logger } = require("../utils/logger");

module.exports.signup = async (req,res) => {
    try {
        const user = await new User(req.body).signup()
      const token = await generateAuthToken({id:user._id, email: user.email, role: user.role})
        return success(res,{user, token})
    } catch (err) {
        logger.error("Error occurred at signup", err);
     return   error(res,{code: err.code, message: err.message})
    }
}

module.exports.login = async (req,res) => {
    try {
        const user = await new User(req.body).login()
      const token = await generateAuthToken({id:user._id, email: user.email, role: user.role})
        return success(res,{user, token})
    } catch (err) {
        logger.error("Error occurred at login", err);
     return   error(res,{code: err.code, message: err.message})
    }
}

module.exports.getAllUsers = async (req,res) => {
    try {
        const user = await new User(req.body).getAllUsers()
        return success(res,{user})
    } catch (err) {
        logger.error("Error occurred at getAllUsers", err);
        return   error(res,{code: err.code, message: err.message})
    }
}

module.exports.getUserById = async (req,res) => {
    try {
        console.log(req.params.userId);
        const user = await new User({userId: req.params.userId}).getUserById()
        return success(res,{user})
    } catch (err) {
        logger.error("Error occurred at getUserById", err);
        return   error(res,{code: err.code, message: err.message})
    }
}

module.exports.verifyUserEmail = async (req,res) => {
    try {
        const userId = req.user._id
    console.log({userId});
        const user = await new User({otp:req.body.otp, userId}).verifyUser()
        return success(res,{user}, "user Email has been verified")
    } catch (err) {
        logger.error("Error occurred at verifyUserEmail", err);
     return   error(res,{code: err.code, message: err.message})
    }
}

module.exports.addUserInterest = async (req,res) => {
    try {
        const userId = req.user._id
        const interest = req.body.interest
    console.log({userId, interest});
        const user = await new User({interest, userId}).addUserInterest()
        return success(res,{user}, "Interests Added")
    } catch (err) {
        logger.error("Error occurred at updateUserInterest", err);
     return   error(res,{code: err.code, message: err.message})
    }
}

module.exports.followUser = async (req,res) => {
    try {
        const followerId = req.user._id
        const userId = req.query.userId
    console.log({userId, followerId});
        const user = await new User({followerId, userId}).followUser()
        return success(res,{user}, "user Followed")
    } catch (err) {
        logger.error("Error occurred at followUser", err);
     return   error(res,{code: err.code, message: err.message})
    }
}

module.exports.unfollowUser = async (req,res) => {
    try {
        const followerId = req.user._id
        const userId = req.query.userId
    console.log({userId, followerId});
        const user = await new User({followerId, userId}).unFollowUser()
        return success(res,{user}, "user Followed")
    } catch (err) {
        logger.error("Error occurred at followUser", err);
     return   error(res,{code: err.code, message: err.message})
    }
}