const Joi = require('@hapi/joi');

module.exports.register = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userRoles: Joi.string().optional()

});

module.exports.login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
});

module.exports.requestResetPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required()
});

module.exports.confirmResetPasswordSchema = Joi.object().keys({
  token: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),

});

