const passport = require('passport')
const router = require('express').Router()
const userController = require('../controllers/user.controller')
// Inscription
router.post("/signup", userController.signup)

// Connexion
router.post("/login", userController.login)

module.exports = router