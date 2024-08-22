const constants = require('../constants');
const approvalService = require('../Service/approvalRequestService');

module.exports.createApproval = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id;
    const serviceResponse = await approvalService.createApproval(req.body, userId);
    response.status = 200;
    response.message = constants.approvalRequestMessage.APPROVAL_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: signup', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateApprovalRequest = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const { id } = req.params; 
    const { status } = req.body;
    const userId = req.user.id; 
   
    const serviceResponse = await approvalService.updateApprovalRequest(id, userId, status);

    response.status = 200;
    response.message = constants.approvalRequestMessage.APPROVAL_UPDATED(status);
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: updateRequestStatus', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};