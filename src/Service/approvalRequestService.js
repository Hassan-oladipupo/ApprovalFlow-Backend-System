const Approval = require('../models/approvalModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const comments = require('../constants/index');
const constants = require('../constants/index');

module.exports.createApproval = async ({ title, description, documents, approvers, cc }, userId) => {
  try {
    const newApproval = new Approval({ 
      title, 
      description, 
      documents, 
      approvers, 
      cc,
      createdBy: userId 
    });

    let result = await newApproval.save();
    
    return mongoDbDataFormat.formatMongoData(result);
  } catch (error) {
    console.log('Something went wrong: Service: createApproval', error);
    throw new Error(error);
  }
};

module.exports.updateApprovalRequest = async (id, userId, status) => {
    try {
      if (status !== 'approved' && status !== 'rejected') {
        throw new Error(constants.approvalRequestMessage.INVALID_STATUS);
      }
  
      const request = await Approval.findById(id);
      if (!request) {
        throw new Error(constants.approvalRequestMessage.APPROVAL_NOT_FOUND);
      }
  
      if (!request.approvers.includes(userId)) {
        throw new Error(constants.approvalRequestMessage.UNAUTHORIZED_APPROVER);
      }
  
      const updateData = {
        [status === 'approved' ? 'approvedBy' : 'rejectedBy']: userId,
        status: status
      };
  
      return await Approval.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
    } catch (error) {
      console.log('Something went wrong: Service: updateRequestStatus', error);
      throw new Error(error);
    }
  };
