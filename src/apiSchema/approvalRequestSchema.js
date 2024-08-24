const Joi = require('@hapi/joi');

module.exports.createRequest = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  documentUrl: Joi.array().items(Joi.string()).optional(),
  approversEmails: Joi.array().items(Joi.string().email()).required(),
  ccEmails: Joi.array().items(Joi.string().email()).optional(),
});

module.exports.updateRequest = Joi.object().keys({
  status: Joi.string().valid('pending', 'approved', 'rejected').required(),
});


module.exports.editRequest = Joi.object().keys({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  documentUrl: Joi.array().items(Joi.string()).optional(),
  approversEmails: Joi.array().items(Joi.string().email()).optional(),
  ccEmails: Joi.array().items(Joi.string().email()).optional(),
});