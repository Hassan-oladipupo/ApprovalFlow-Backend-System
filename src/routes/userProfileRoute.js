const express = require("express");
const router = express.Router();
const userProfileController = require('../Controller/userProfileController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userProfileSchema = require('../apiSchema/userProfileSchema');
const accessControlValidation = require('../middleware/accessControlValidation');

router.post('/',
    accessControlValidation.validateToken,
    joiSchemaValidation.validateBody(userProfileSchema.addUserProfileSchema),
  userProfileController.addUserProfile
  );


  router.get('/',
    accessControlValidation.validateToken,
    userProfileController.retrieveUserProfile,
    
  );
  
  router.put('/:id',
    accessControlValidation.validateToken,
    joiSchemaValidation.validateBody(userProfileSchema.updateUserProfileSchema),
  userProfileController.updateUserProfile
  );

  router.delete('/',
    accessControlValidation.validateToken,
  userProfileController.removeUserProfile
  );

  router.post('/upload', 
    accessControlValidation.validateToken,
    userProfileController.uploadUserProfileImage
  );

  
  
module.exports = router;    