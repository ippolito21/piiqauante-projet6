const mongoose = require('mongoose')
const mongooseUniqueValidator = require("mongoose-unique-validator")

mongoose.plugin(mongooseUniqueValidator)
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("user", userSchema)