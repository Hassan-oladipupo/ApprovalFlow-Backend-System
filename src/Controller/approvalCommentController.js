const constants = require('../constants');
const commentService = require('../Service/approvalCommentService');

module.exports.addCommentToApprovalRequest = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const { id } = req.params;  
    const { comment } = req.body; 
    const userId = req.user.id;  

    const serviceResponse = await commentService.addCommentToApprovalRequest(id, comment, userId);
  
    response.status = 200;
    response.message = constants.approvalRequestMessage.COMMENT_ADDED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: addCommentToApprovalRequest', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};


module.exports.removeComment  = async (req, res) => {
  let response = {...constants.customServerResponse }; 
  try {
    const userId = req.user.id; 
    const serviceResponse = await commentService.removeComment ({
      id: req.params.id,
      userId: userId
    });
    response.status = 200;
    response.message = constants.commentRequestMessage.COMMENT_REMOVED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: removeComment', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}