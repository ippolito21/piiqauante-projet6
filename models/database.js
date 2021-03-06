/*une fois le package mongoose installé je l'importe dans le fichier */
const mongoose = require("mongoose");

// *** Connexion base de données avec plusieurs paramètres dans uri
async function connectionBaseDeDonnees() {
  // Mon adresse srv et mot de passe utilisateur mongodb defini au niveau du fichier .env
  const {MONGODB_PASSWORD,  MONGODB_DATABASE, MONGODB_USERNAME, MONGODB_CLUSTER} = process.env
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`
    );
    console.log("Connexion MongoDB Atlas réussi");
  } catch (error) {
    console.error(error);
  }
}
/*exporter la connexion à la base de donnée pour que les autres fichiers ont accès dans le serveur */
module.exports = connectionBaseDeDonnees;
