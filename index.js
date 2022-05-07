// On recupere le paquet express et on le stock dans la variable express
const express = require('express')
const cors = require('cors')
require('dotenv').config()
// Routes Utilisateurs
const userRoutes = require('./routes/user.routes')
// base de donées
const connexionBaseDeDonnees = require('./models/database')

// On crée un application express
const app = express()
// appel  à la fonction
connexionBaseDeDonnees()

app.use(cors())
app.use(express.json())
app.use("/api/auth", userRoutes)

app.listen(3000, () => console.log("Api Piiquante port 3000"))

