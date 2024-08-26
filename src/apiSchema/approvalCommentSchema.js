const Joi = require('@hapi/joi');

module.exports.addComment = Joi.object().keys({
  comment: Joi.string().required(),
});

module.exports.editComment = Joi.object().keys({
  comment: Joi.string().optional(),
});