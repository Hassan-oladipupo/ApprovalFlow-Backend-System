const Approval = require('../models/approvalRequestModel'); 
const mongoDbDataFormat = require('../helper/dbHelper');
const User = require('../models/userModel');
const constants = require('../constants/index')

module.exports.createApproval = async ({ title, description, documents, approversEmails, ccEmails }, userId) => {
  try {
    const approvers = await User.find({ email: { $in: approversEmails } }).select('_id');
    const cc = await User.find({ email: { $in: ccEmails } }).select('_id');

    const approverIds = approvers.map(approver => approver._id);
    const ccIds = cc.map(ccUser => ccUser._id);

    

    

    if (approvers.length !== approversEmails.length) {
      throw new Error(constants.approvalRequestMessage.APPROVAL_NOT_FOUND);
    }

    if (cc.length !== ccEmails.length) {
      throw new Error(constants.approvalRequestMessage.CC_EMAIL_NOT_FOUND);
    }

    const newApproval = new Approval({ 
      title, 
      description, 
      documentUrl: documents,  
      approversEmails: approverIds,  
      ccEmails: ccIds,             
      user: userId,  
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
    mongoDbDataFormat.checkObjectId(id);

    if (status !== 'approved' && status !== 'rejected') {
      throw new Error(constants.approvalRequestMessage.INVALID_STATUS);
    }

    const request = await Approval.findById(id);
    if (!request) {
      throw new Error(constants.approvalRequestMessage.APPROVAL_NOT_FOUND);
    }

    if (!Array.isArray(request.approversEmails)) {
      throw new Error(constants.approvalRequestMessage.INVALID_APPROVERS_LIST);
    }

    if (!request.approversEmails.includes(userId)) {
      throw new Error(constants.approvalRequestMessage.UNAUTHORIZED_APPROVER);
    }

    const updateData = {
      [status === 'approved' ? 'approvedBy' : 'rejectedBy']: userId,
      status: status,
    };

    const updatedRequest = await Approval.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return updatedRequest;
  } catch (error) {
    console.log('Something went wrong: Service: updateApprovalRequest', error);
    throw new Error(error.message);
  }
};





module.exports.getApprovalsByUser = async (userId) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);

    const approvals = await Approval.find({
      $or: [
        { user: userId },
        { approversEmails: userId },
        { ccEmails: userId }
      ]
    })
    .populate('user', 'email') 
    .populate('approversEmails', 'email')
    .populate('ccEmails', 'email');

    if (!approvals || approvals.length === 0) {
      return [];
    }

    const formattedApprovals = approvals.map(approval => ({
      ...approval.toObject(),
      user: approval.user.email,
      approversEmails: approval.approversEmails.map(approver => approver.email),
      ccEmails: approval.ccEmails.map(cc => cc.email)
    }));

    return formattedApprovals;
  } catch (error) {
    console.log('Something went wrong: Service: getApprovalsByUser', error);
    throw new Error(error.message);
  }
};

