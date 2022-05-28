//Lire un fichier et modifier son contenu et lire
// à nouveau en utilisant l'API basée sur le rappel.
const fs = require("fs/promises");
const express = require("express");
const SauceModel = require("../models/sauce.model");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.createSauce = async (req, res) => {
  const body = req.body;
  // on recupere les données relatives à la sauce comme le names , description etc...
  const sauce = { ...JSON.parse(body.sauce) };

  try {
    // on crée un nouveau document sauce avec les les données de la sauce ainsi que l'imageUrl
    await new SauceModel({
      ...sauce,
      imageUrl: `${req.protocol}://${req.get("host")}/public/images/${
        req.file.filename
      }`,
    }).save();
    // ** On retourne un message de creation avec un status code de 201
    res.status(201).json({ message: "Created Sauce" });
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getAllSauces = async (req, res) => {
  try {
    // ** On cherche toute les sauces
    const sauces = await SauceModel.find();
    // res 200 si tout est ok

    res.status(200).json(sauces);
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getOneSauce = async (req, res) => {
  try {
    const id = req.params.id;
    // ** On cherche la sauce en fonction de son id
    const sauce = await SauceModel.findById(id);
    console.log(sauce);
    // ** Si la sauce n'existe pas on rencoie une erreur 404
    if (!sauce) return res.status(404).json({ message: "Sauce non trouvée!" });
    // res 200 si tout est ok

    res.status(200).json(sauce);
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.deleteSauce = async (req, res) => {
  try {
    const id = req.params.id;
    // ** On cherche la sauce en fonction de son id
    const sauce = await SauceModel.findById(id);
    // ** Si la sauce n'existe pas on rencoie une erreur 404
    if (!sauce) return res.status(404).json({ message: "Sauce non trouvée!" });
    // ** On coupe la valeur de l'imageURL et on recupere le nom nom de l'image qui est à l'index 1
    const imageName = sauce.imageUrl.split("images/")[1];
    // ** On supprime l'image du disque dur
    await fs.unlink(`public/images/${imageName}`);
    // ** On supprime la sauce dans Mongodb
    await SauceModel.deleteOne({ _id: id });
    // res 200 si tout est ok
    res.status(200).json({ message: "Sauce suprimée!" });
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};
// ** Modifier un sauce controller
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.updateSauce = async (req, res) => {
  // ** Identifiant de la sauce issus de l'url
  const id = req.params.id;
  // ** Objet file recupéré depuis multer
  const file = req.file;
  // ** On cherche la sauce de part son identifiant
  try {
    const sauce = await SauceModel.findById(id);
    // ** variable represantant une sauce qui n'est pas encore initialisée
    let sauceContent;
    // ** Si on a pas de sauce retourne une erreur 404
    if (!sauce) return res.status(404).json({ message: "Sauce non touvée" });
    // ** Si l'utilisateur à modifier l'image
    if (file) {
      // ** Contenu textuel ainsi que le chemin vers la nouvelle image
      sauceContent = {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/public/images/${
          req.file.filename
        }`,
      };
      // ** On coupe la valeur de l'imageURL et on recupere le nom  de l'image qui est à l'index 1
      const imageName = sauce.imageUrl.split("images/")[1];
      // ** On supprime l'image du disque dur
      await fs.unlink(`public/images/${imageName}`);
      // On met un jour la sauce avec les nouvelles données
      await SauceModel.updateOne({ _id: id }, { ...sauceContent });
      // res 200 si tout est ok (success)
      res.status(200).json({ message: "Sauce à bien été mis à jour" });
    } else {
      // ** Contenu textuel ainsi que le chemin vers la nouvelle image
      sauceContent = { ...req.body };
      // On met un jour la sauce avec les nouvelles données
      await SauceModel.updateOne({ _id: id }, { ...sauceContent });
      // res 200 si tout est ok (success)
      res.status(200).json({ message: "Sauce à bien été mis à jour" });
    }
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.likesAndDislikesSauce = async (req, res) => {
  // ** On recupere l'identifiant de la sauce depuis les parametre de l'url
  const id = req.params.id;
  // **On extrait le like ainsi que le userId depuis le corps de la requete
  const { like, userId } = req.body;
  try {
    // ** On cherche la sauce de part son identifiant
    const sauce = await SauceModel.findById(id);
    // ** Si on trouve pas de sauce on retourne une erreur 404
    if (!sauce) return res.status(404).json({ message: "Sauce non trouvée" });
    // Si le like est à 1 donc l'utilisateur à liker la sauce
    if (like === 1) {
      // *** On verifie si l'utilisateur n'a pas deja liké la sauce
      if (!sauce.usersLiked.includes(userId)) {
        // ** On cherche la sauce de part son identifiant et on va mettre à jour cette sauce
        await SauceModel.updateOne(
          { _id: id },
          // ** On ajoute l'utilisateur ayant liké dans le tableau des utilisateur qui ont liké
          // ** On increment la propreité like de 1 (on ajoute 1 à la valeur existante)
          { $push: { usersLiked: userId }, $inc: { likes: 1 } }
        );
        // ** On retourne un status de success 200 avec un message
        res.status(200).json({ message: "Like pris en compte" });
      }
    }
    // Si le like est à -1 donc l'utilisateur à disliker la sauce
    else if (like === -1) {
      // *** On verifie si l'utilisateur n'a pas deja disliké la sauce
      if (!sauce.usersDisliked.includes(userId)) {
        // ** On cherche la sauce de part son identifiant et on va mettre à jour cette sauce
        await SauceModel.updateOne(
          { _id: id },
          {
            // ** On ajoute l'utilisateur ayant disliké dans le tableau des utilisateur qui ont disliké
            // ** On increment la proprieté dislike de 1 (on ajoute 1 à la valeur existante)
            $push: { usersDisliked: userId },
            $inc: { dislikes: 1 },
          }
        );
        // ** On retourne un status de success 200 avec un message
        res.status(200).json({ message: "Dislike pris en compte" });
      }
    } // Si le like est à 0 donc l'utilisateur à soit à annuler son disliker ou son like
    else if (like === 0) {
      // *** On verifie si l'utilisateur est present dans le tableau des utilisateurs qui ont disliké la sauce
      if (sauce.usersDisliked.includes(userId)) {
        // ** On cherche la sauce de part son identifiant et on va mettre à jour cette sauce
        await SauceModel.updateOne(
          { _id: id },
          {
            // ** On retire l'utilisateur ayant disliké dans le tableau des utilisateur qui ont disliké
            // ** On decremente la proprieté dislikes de 1 (on soustrait 1 à la valeur existante)
            $pull: { usersDisliked: userId },
            $inc: { dislikes: -1 },
          }
        );
        // ** On retourne un status de success 200 avec un message

        res.status(200).json({ message: "Dislike annuler" });
        // *** On verifie si l'utilisateur est present dans le tableau des utilisateurs qui ont liké la sauce
      } else if (sauce.usersLiked.includes(userId)) {
        // ** On cherche la sauce de part son identifiant et on va mettre à jour cette sauce
        await SauceModel.updateOne(
          { _id: id },
          {
            // ** On retire l'utilisateur ayant liké dans le tableau des utilisateur qui ont liké
            // ** On decremente la proprieté likes de 1 (on soustrait 1 à la valeur existante)
            $pull: { usersLiked: userId },
            $inc: { likes: -1 },
          }
        );
        // ** On retourne un status de success 200 avec un message
        res.status(200).json({ message: "like annuler" });
      }
    }
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};
