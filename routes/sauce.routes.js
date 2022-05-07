const router = require('express').Router()
const multer = require("../middlewares/multer")
const sauceController = require('../controllers/sauce.controller')

// ** Ajouter une sauce 

router.post('/sauces',multer, sauceController.createSauce)

module.exports = router