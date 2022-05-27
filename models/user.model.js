// On recupere, importe le paquet mongoose et on le stock dans la variable mongoose
const mongoose = require('mongoose')
const mongooseUniqueValidator = require("mongoose-unique-validator")

/*création de schéma de données qui contient les champs souhaités pour un utilisateur*/
/*l'utilisateur peut s'inscrire avec un email et un mot de passse unique */
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
/* importe ce schéma en tant que modèle Mongoose appelé « utilisateur », le rendant disponible pour notre application Express */
module.exports = mongoose.model("user", userSchema)