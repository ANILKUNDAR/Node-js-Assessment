var multer = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

module.exports= multer({ storage: storage });

