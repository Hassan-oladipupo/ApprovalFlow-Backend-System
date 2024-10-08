const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

function checkFileType(file, cb) {
  const filetypes =/jpeg|jpg|pdf|excel|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Invalid file type! Allowed types are JPEG, JPG, PDF, Excel, PNG, GIF.');
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, 
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports = upload;