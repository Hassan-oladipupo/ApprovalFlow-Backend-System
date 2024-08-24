const mongoose = require('mongoose');
const constants = require('../constants');
const crypto = require('crypto');


module.exports.formatMongoData = (data) => {
  if (Array.isArray(data)) {
   let newDataList = [];
      for (value of data) {
        newDataList.push(value.toObject());
      }
      return newDataList;
}
return data.toObject();
}

module.exports.checkObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(constants.databaseMessage.INVALID_ID);
  }
}




module.exports.uuidToObjectId = (uuid) => {
  if (!uuid) {
    throw new Error('UUID is required');
  }
  
  const hash = crypto.createHash('sha1').update(uuid).digest('hex');
  
  if (hash.length < 24) {
    throw new Error('Generated hash is too short to be an ObjectId');
  }
  
  return new mongoose.Types.ObjectId(hash.substring(0, 24));
};









