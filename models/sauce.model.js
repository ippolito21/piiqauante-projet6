// On recupere, importe le paquet mongoose et on le stock dans la variable mongoose
const mongoose = require('mongoose')

/*création de schéma de données qui contient les champs souhaités pour chaque sauce*/
/*indique type ainsi que leur caractère */
const sauceSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
        /*sans la configuration du champ required:true, sans le champ userId, name, on ne pourra pas utiliser l'objet sauce dans la basse de donnée */
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
    usersLiked: {
        type: [mongoose.Types.ObjectId]
    },
    usersDisliked: {
        type: [mongoose.Types.ObjectId]
    }
})

/*j'importe ce schéma en tant que modèle Mongoose appelé « sauce », le rendant disponible pour notre application Express */
module.exports = mongoose.model('sauce', sauceSchema)