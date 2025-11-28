const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `avatar-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
        // avatar-1234-1234.jpg
    }
})

function ckeckFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 2000000 },
    fileFilter: function (req, file, cb) {
        ckeckFileType(file, cb);
    }
});

module.exports = upload;