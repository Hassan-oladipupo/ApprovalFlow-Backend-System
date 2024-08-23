const express = require('express');
const router = express.Router();
const approvalRequestController = require('../Controller/approvalRequestController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const approvalRequestSchema = require('../apiSchema/approvalRequestSchema');


router.post('/create-request',
  joiSchemaValidation.validateBody(approvalRequestSchema.createRequest),
  approvalRequestController.createApproval
);                              

router.put('/update-request',
  joiSchemaValidation.validateBody(approvalRequestSchema.updateRequest),
  approvalRequestController.updateApprovalRequest
);      