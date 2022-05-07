const mongoose = require('mongoose')

async function connectionBaseDeDonnees() {
    try {
        await mongoose.connect(`mongodb+srv://laure:${process.env.MONGODB_PASSWORD}@cluster0.vnypl.mongodb.net/piiquante?retryWrites=true&w=majority`)
        console.log("Connexion MongoDB Atlas réussi")
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectionBaseDeDonnees