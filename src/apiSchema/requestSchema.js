const Joi = require('@hapi/joi');

module.exports.createRequest = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  documents: Joi.array().items(Joi.string()).optional(),
  approvers: Joi.array().items(Joi.string().email()).required(),
  cc: Joi.array().items(Joi.string().email()).optional(),
});
