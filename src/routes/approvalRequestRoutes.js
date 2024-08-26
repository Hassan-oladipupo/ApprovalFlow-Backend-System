const express = require('express');
const router = express.Router();
const approvalRequestController = require('../Controller/approvalRequestController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const approvalRequestSchema = require('../apiSchema/approvalRequestSchema');
const accessControlValidation = require('../middleware/accessControlValidation');
const uploadsImageValidation = require('../middleware/uploadDocumentsValidation');
const approvalCommentController = require('../Controller/approvalCommentController');
const approvalCommentSchema = require('../apiSchema/approvalCommentSchema');


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


router.put('/edit/:id',
  accessControlValidation.validateToken,
  joiSchemaValidation.validateBody(approvalRequestSchema.editRequest),
  approvalRequestController.updateExitingApprovalRequest  
); 


router.post('/:id/comment',
  accessControlValidation.validateToken,
  joiSchemaValidation.validateBody(approvalCommentSchema.addComment),
  approvalCommentController.addCommentToApprovalRequest
);    
router.delete('/:id/comment', 
  accessControlValidation.validateToken, 
  approvalCommentController.removeComment);   

  router.put('/:id/comment', 
    accessControlValidation.validateToken, 
    joiSchemaValidation.validateBody(approvalCommentSchema.editComment),
    approvalCommentController.updateExitingComment);

module.exports = router;