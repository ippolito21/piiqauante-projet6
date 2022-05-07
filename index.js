// On recupere le paquet express et on le stock dans la variable express
const express = require('express')
const cors = require('cors')
const passport = require('passport')
require('dotenv').config()

// *** passport
require('./middlewares/auth')

// Routes Utilisateurs
const userRoutes = require('./routes/user.routes')
// Routes sauces
const sauceRoutes = require('./routes/sauce.routes')
// base de donées
const connexionBaseDeDonnees = require('./models/database')

// On crée un application express
const app = express()
// appel  à la fonction
connexionBaseDeDonnees()

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use('/public', express.static('public'))
app.use("/api/auth", userRoutes)
app.use("/api", sauceRoutes)

app.listen(3000, () => console.log("Api Piiquante port 3000"))

