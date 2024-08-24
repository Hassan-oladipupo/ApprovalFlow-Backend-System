const express = require('express');
const router = express.Router();
const approvalRequestController = require('../Controller/approvalRequestController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const approvalRequestSchema = require('../apiSchema/approvalRequestSchema');
const accessControlValidation = require('../middleware/accessControlValidation');
const uploadsImageValidation = require('../middleware/uploadsImageValidation');


router.post('/',
  accessControlValidation.validateToken,
  uploadsImageValidation.single('documentUrl'), 
  joiSchemaValidation.validateBody(approvalRequestSchema.createRequest),
  approvalRequestController.createApproval
);                              

router.put('/:id',
  accessControlValidation.validateToken,
  joiSchemaValidation.validateBody(approvalRequestSchema.updateRequest),
  approvalRequestController.updateApprovalRequest
);   

router.get('/', 
  accessControlValidation.validateToken, 
  approvalRequestController.getApprovalsByUser);   


  router.delete('/:id', 
    accessControlValidation.validateToken, 
    approvalRequestController.deleteApprovalRequest);   


    
// router.put('/:approvalId', 
//   accessControlValidation.validateToken,
//   joiSchemaValidation.validateBody(approvalRequestSchema.editRequest),
//   approvalRequestController.editApproval);

module.exports = router;