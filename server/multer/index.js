const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname); // modified here  or user file.mimetype
    }
})

const upload = multer({ storage })

module.exports = {
    upload
}