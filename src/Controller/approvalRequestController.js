const constants = require('../constants');
const approvalService = require('../Service/approvalRequestService');

module.exports.createApproval = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id;

    const documentUrl = req.file ? req.file.path : undefined;

    const approvalData = {
      ...req.body,
      documentUrl, 
    };

    const serviceResponse = await approvalService.createApproval(approvalData, userId);
    response.status = 201;
    response.message = constants.approvalRequestMessage.APPROVAL_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: createApproval', error);
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


module.exports.getApprovalsByUser = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id; 

    const serviceResponse = await approvalService.getApprovalsByUser(userId);

    if(serviceResponse.length ===0)
      {
        response.status = 200;
        response.message =  constants.approvalRequestMessage.USER_APPROVAL_EMPTY;
      }
  
    else{
      response.status = 200;
    response.message = constants.approvalRequestMessage.APPROVAL_RETRIEVED;
    response.body = serviceResponse;
    }

  
  } catch (error) {
    console.log('Something went wrong: Controller: getApprovalsByUser', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};


module.exports.deleteApprovalRequest = async (req, res) => {
  let response = {...constants.customServerResponse }; 
  try {
    
    const userId = req.user.id; 
    const serviceResponse = await approvalService.deleteApprovalRequest({
      id: req.params.id,
      userId: userId
    });
    response.status = 200;
    response.message = constants.approvalRequestMessage.APPROVAL_REMOVED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: deleteApprovalRequest', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.updateExitingApprovalRequest = async (req, res) => {
  let response = {...constants.customServerResponse }; 
  try {
    const serviceResponse = await approvalService.updateExitingApprovalRequest({
      id: req.params.id,
      updateInfo: req.body
    });
      response.status = 200;
     response.message = constants.approvalRequestMessage.APPROVAL_UPDATED;
      response.body = serviceResponse;
    
  } catch (error) {
    console.log('Something went wrong: Controller: updateExitingApprovalRequest', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}