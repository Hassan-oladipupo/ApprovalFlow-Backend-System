const Joi = require('@hapi/joi');



module.exports.addComment = Joi.object().keys({
  comment: Joi.string().required(),
});


