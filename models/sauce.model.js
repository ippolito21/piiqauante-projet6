const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainPepper: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    heat: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    userLiked: {
        type: [mongoose.Types.ObjectId]
    },
    userDisliked: {
        type: [mongoose.Types.ObjectId]
    }
})

module.exports = mongoose.model('sauce', sauceSchema)