const User = require('../models/userModel');
const constants = require('../constants');
const mongoDbDataFormat = require('../helper/dbHelper');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const validator = require("validator");
 const accessControlValidation = require('../middleware/accessControlValidation')
 const crypto = require('crypto');
 const UserProfile = require('../models/userProfileModel')



module.exports.register = async ({ email, password, firstName, lastName, userRoles }) => {
  try {
    if (!validator.isEmail(email)) {
      throw new Error(constants.userMessage.INVALID_EMAIL);
    }

    const user = await User.findOne({ email });
    if (user) {
      throw new Error(constants.userMessage.DUPLICATE_EMAIL);
    }

    if (!accessControlValidation.isValidPassword(password)) {
      throw new Error(constants.userMessage.WEAK_PASSWORD);
    }

    password = await bcrypt.hash(password, 12);
    const confirmToken = crypto.randomBytes(32).toString('hex');

    const newUser = new User({ 
      email, 
      password, 
      firstName, 
      lastName, 
      userRoles,
      confirmToken,
      isConfirmed: false 
    });

    let result = await newUser.save();
    return mongoDbDataFormat.formatMongoData(result);
  } catch (error) {
    console.log('Something went wrong: Service: signup', error)
    throw new Error(error);
  }
};

module.exports.confirmToken = async (token) => {
  try {
    const user = await User.findOne({ confirmToken: token });
    if (!user) {
      throw new Error(constants.userMessage.INVALID_TOKEN);
    }

    

    if ( user.isConfirmed === true) {
      throw new Error(constants.userMessage.EMAIL_ALREADY_CONFIRMED);
    }else{
      user.isConfirmed = true;
      user.confirmToken = undefined;
      await user.save();
      return mongoDbDataFormat.formatMongoData(user);
    }
    
  } catch (error) {
    console.log('Something went wrong: Service:confirmToken', error);
    throw new Error(error);
  }
}






module.exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!validator.isEmail(email)) {
      throw new Error(constants.userMessage.INVALID_EMAIL);
    }
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error(constants.userMessage.INVALID_PASSWORD);
    }

    const userProfile = await UserProfile.findOne({ email });
    let profileImage = null;

    if (userProfile && userProfile.profileImage) {
      profileImage = userProfile.profileImage;
    }

    const tokenPayload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: profileImage,
      
    };

    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY || 'my-secret-key', { expiresIn: '7d' });

    const result = {
      user: mongoDbDataFormat.formatMongoData(user),
      token: token
    };

    return result;

  } catch (error) {
    console.error('Something went wrong: Service: login', error);
    throw new Error(error);
  }
}

module.exports.requestResetPassword = async (email) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(constants.userMessage.USER_NOT_FOUND);
      }
      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; 
      await user.save();
      return token;
    } catch (error) {
      console.log('Something went wrong: Service:requestResetPassword', error);
    throw new Error(error);
    }
  };
  
  
  module.exports.confirmResetPassword = async (token, newPassword, confirmPassword) => {
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        throw new Error(constants.userMessage.USER_NOT_FOUND);
      }

      if (!accessControlValidation.isValidPassword(newPassword)) {
        throw new Error(constants.userMessage.WEAK_PASSWORD);
      }

      if (newPassword != confirmPassword) {
        throw new Error(constants.userMessage.MATCH_PASSWORD);
      }
  
      user.password = await bcrypt.hash(newPassword, 12);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      return user;
    } catch (error) {
      console.log('Something went wrong: Service:confirmResetPassword', error);
      throw new Error(error);
    }
  };