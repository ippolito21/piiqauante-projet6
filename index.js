// On recupere, importe le paquet express et on le stock dans la variable express
const express = require("express");
const cors = require("cors");
//autorise le partage de ressources (données) entre plusieurs domaines (entre angular 4200, l'api 3000)
const helmet =require('helmet');
const passport = require("passport");
require("dotenv").config();

// *** passport
require("./middlewares/auth");

// Routes Utilisateurs
const userRoutes = require("./routes/user.routes");
// Routes sauces
const sauceRoutes = require("./routes/sauce.routes");
// base de données
const connexionBaseDeDonnees = require("./models/database");
// ** Limiteur
const {limiter} = require('./middlewares/limiter')

// On crée une application express
const app = express();
// appel  à la fonction
connexionBaseDeDonnees();
app.use("/public", express.static("public"));
/* pour servir des fichiers statiques tels que des images, des fichiers CSS et des fichiers JavaScript dans un répertoire nommé public*/

//intercepter toutes les requetes avec app.use
app.use(limiter)
app.use(cors());
app.use(helmet());
app.use(express.json());
/*analyse le corps, body sur l'objet de la requête */
app.use(passport.initialize());


app.use("/api/auth", userRoutes);
app.use("/api", sauceRoutes);

// app.listen(3000, () => console.log("Api Piiquante port 3000"))


app.listen(process.env.PORT, () =>
  console.log(`Api Piiquante port ${process.env.PORT}`)
);
