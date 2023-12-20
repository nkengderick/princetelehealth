const multer = require('multer')
const path = require('path')

const dStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + path.extname(file.originalname)
        cb(null, filename)
    },
})

const dFilter = (req ,file, cb) => {
    if(
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/png'
        ) {
        cb(null, true)
    } else {
        console.log('Only jpg, jpeg and png files are supported')
        cb(null, false)
    }
}

const upload = multer ({
    storage: dStorage,
    fileFilter: dFilter,
})

module.exports = upload