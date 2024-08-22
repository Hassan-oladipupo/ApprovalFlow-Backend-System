const constants = require('../constants');
const userService = require('../Service/userService');


module.exports.register = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await userService.register(req.body);
    response.status = 201;
    response.message = constants.userMessage.SIGNUP_SUCCESS;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: signup', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.confirmToken = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await userService.confirmToken(req.body);
    response.status = 200;
    response.message = constants.userMessage.CONFIRM_TOKEN_SUCCESS;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: confirmToken', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.login = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await userService.login(req.body);
    response.status = 200;
    response.message = constants.userMessage.LOGIN_SUCCESS;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: login', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}



module.exports.requestResetPassword = async (req, res) => {
    let response = { ...constants.customServerResponse };
    try {
      const token = await userService.requestResetPassword(req.body.email);
      response.status = 200;
      response.message =constants.userMessage.RESET_PASSWORD;
      response.body = { token }; 
    } catch (error) {
        console.log('Something went wrong: Controller: requestResetPassword', error);
       response.message = error.message;
    }
    return res.status(response.status).send(response);
  };
  
  module.exports.confirmResetPassword = async (req, res) => {
    let response = { ...constants.customServerResponse };
    try {
      await userService.confirmResetPassword(req.body.token, req.body.newPassword, req.body.confirmPassword);
      response.status = 200;
      response.message = constants.userMessage.RESET_NEW_PASSWORD;
    } catch (error) {

        console.log('Something went wrong: Controller: confirmResetPassword', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  };