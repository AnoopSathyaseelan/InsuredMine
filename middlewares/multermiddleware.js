const multer = require('multer');
const fs = require('fs');


// Configure Multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `./tmp/csvFiles`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, './tmp/csvFiles');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

exports.upload = multer({
  storage, fileFilter: function (req, file, cb) {
    file.mimetype === 'text/csv' || file.mimetype === 'text/xslx' ? cb(null, true) : cb(null, false)
  }
});