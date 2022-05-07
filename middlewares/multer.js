const multer = require('multer')
const { v4 } = require('uuid')

const mimeTypes = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/webp": "webp"
}

// ** on crée un store multer
const fileStore = multer.diskStorage({
    // la destination des images =>  dossier public/images
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    // definition du nom de l'image
    filename: (req, file, cb) => {
        const extension = mimeTypes[file.mimetype]
        cb(null, `${v4()}.${extension}`)
    }
})

module.exports = multer({storage : fileStore}).single("image")