const passport = require("passport");
const router = require("express").Router();
const multer = require("../middlewares/multer");
const sauceController = require("../controllers/sauce.controller");

router.use(passport.authenticate("jwt", { session: false }));
// ** Ajouter une sauce
router.post("/sauces", multer, sauceController.createSauce);

// ** Recuperer toutes les sauces
router.get("/sauces", sauceController.getAllSauces);

// ** Recuperer une sauce en particulier selon son id
router.get("/sauces/:id", sauceController.getOneSauce);

// ** Supprimer une sauce selon son id
router.delete("/sauces/:id", sauceController.deleteSauce);

// ** Modifier une sauce selon son id
router.put("/sauces/:id", multer, sauceController.updateSauce);
// ** Likes et dislikes
router.post("/sauces/:id/like", sauceController.likesAndDislikesSauce);

module.exports = router;
