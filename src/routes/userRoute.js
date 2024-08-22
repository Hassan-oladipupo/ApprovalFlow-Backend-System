const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userSchema = require('../apiSchema/userSchema');


router.post('/register',
  joiSchemaValidation.validateBody(userSchema.register),
  userController.register
);

router.post('/confirm-email/:token',
  userController.confirmToken
);

router.post('/login',
  joiSchemaValidation.validateBody(userSchema.login),
  userController.login
);

router.post('/request-reset-password', 
    joiSchemaValidation.validateBody(userSchema.requestResetPasswordSchema),
    userController.requestResetPassword
  );
  
  router.post('/confirm-reset-password',
    joiSchemaValidation.validateBody(userSchema.confirmResetPasswordSchema),
    userController.confirmResetPassword
  );


module.exports = router;