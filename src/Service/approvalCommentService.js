const Comment = require('../models/approvalComment');
const Request = require('../models/approvalRequestModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.addCommentToApprovalRequest = async (id, commentText, userId) => {
  try {
    mongoDbDataFormat.checkObjectId(id);

    const approvalRequest = await Request.findById(id);

    if (!approvalRequest) {
      throw new Error(constants.approvalRequestMessage.APPROVAL_NOT_FOUND);
    }

    const isCreator = approvalRequest.user.equals(userId);
    const isApprover = approvalRequest.approversEmails.some(approverId => approverId.equals(userId));

    if (!isCreator && !isApprover) {
      throw new Error(constants.commentRequestMessage.UNAUTHORIZED_COMMENTER);
    }

    const newComment = new Comment({
      user: userId,
      comment: commentText,  
    });

    const savedComment = await newComment.save();

    approvalRequest.comments.push(savedComment._id);
    await approvalRequest.save();

    return mongoDbDataFormat.formatMongoData(approvalRequest);
  } catch (error) {
    console.log('Something went wrong: Service: addCommentToApprovalRequest', error);
    throw new Error(error);
  }
};

module.exports.updateExitingComment = async ({ id, updateInfo, userId }) => {
    try {
      mongoDbDataFormat.checkObjectId(id);
  
      let approvalComment = await Comment.findById(id);
      if (!approvalComment) {
        throw new Error(constants.commentRequestMessage.COMMENT_NOT_FOUND);
      }
  
      if (!approvalComment.user.equals(userId)) {
        throw new Error(constants.commentRequestMessage.UNAUTHORIZED_COMMENTER);
      }
      
  
  
      let updatedComment = await Comment.findOneAndUpdate(
        { _id: id },
        { $set: updateInfo },  
        { new: true }  
      );
  
  
      return mongoDbDataFormat.formatMongoData(updatedComment);
    } catch (error) {
      console.log('Something went wrong: Service: updateExitingComment', error);
      throw new Error(error);
    }
  };


module.exports.removeComment = async ({ id, userId }) => {
    try {
      mongoDbDataFormat.checkObjectId(id);
      let approvalRequest = await Comment.findById(id);
      if (!approvalRequest) {
        throw new Error(constants.commentRequestMessage.COMMENT_NOT_FOUND);
      }
      if (approvalRequest.user.toString() !== userId) {
        throw new Error(constants.approvalRequestMessage.UNAUTHORIZED_APPROVER);
      }
      await Comment.findByIdAndDelete(id);
      return mongoDbDataFormat.formatMongoData(approvalRequest);
    } catch (error) {
      console.log('Something went wrong: Service: removeComment', error);
      throw new Error(error);
    }
  }