const Joi = require('@hapi/joi');

const billingAddressSchema = Joi.object().keys({
  billingFirstName: Joi.string().required(),
  billingLastName: Joi.string().required(),
  billingAddress1: Joi.string().required(),
  billingAddress2: Joi.string().optional(),
  billingPhoneNumber: Joi.string().required(),
  billingEmailAddress: Joi.string().email().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  zipCode: Joi.string().required()
});

const shippingAddressSchema = Joi.object().keys({
  shippingFirstName: Joi.string().optional(),
  shippingLastName: Joi.string().optional(),
  shippingAddress1: Joi.string().optional(),
  shippingAddress2: Joi.string().optional(),
  shippingPhoneNumber: Joi.string().optional(),
  shippingEmailAddress: Joi.string().email().optional(),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  city: Joi.string().optional(),
  zipCode: Joi.string().optional()
});

module.exports.addUserProfileSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  profileImage: Joi.string().optional(),
  billingAddress: Joi.array().items(billingAddressSchema).required(),
  shippingAddress: Joi.array().items(shippingAddressSchema).optional()
});

module.exports.updateUserProfileSchema = Joi.object().keys({
  email: Joi.string().email().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  profileImage: Joi.string().optional(),
  billingAddress: Joi.array().items(billingAddressSchema).optional(),
  shippingAddress: Joi.array().items(shippingAddressSchema).optional()
});
