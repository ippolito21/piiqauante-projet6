const express = require('express')
/*importe le paquet algorithmes de hachage sécurisé et on le stock dans la variable bcrypt */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//récupére le jeton, le token
const UserModel = require('../models/user.model')

//documentation
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
// ** Controlleur inscription
exports.signup = async (req, res) => {
    // recupere le corps de la requete (données issus du front)
    const body = req.body
    try {
        // ** Hash le mot de passe avec bcrypt
        const hash = await bcrypt.hash(body.password, 10)
        // ** on crée un nouvel utilisateur basé sur le model User
        await new UserModel({ email: body.email, password: hash }).save()
        // *** On renvoie un reponse avec le status de 201 => created Ressource
        res.status(201).json({message: "Compte crée!"})
    } catch (error) {
        // ** On cas d'erreur on renvoie un reponse 500 => Internal server error
        res.status(500).json(error)
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
// ** Controlleur de connexion
exports.login = async(req, res) => {
        // recupere le corps de la requete (données issus du front)
    const body = req.body
    
    try {
        // ** On recherche un utilisateur de par son email
        const user =await UserModel.findOne({email : body.email})
        console.log(user)
        // ** On renvoie une erreur si on trouve pas l'utilisateur dans notre base de données
        if(!user) return res.status(401).json({message : "Connexion non autorisée"})
        // ** On compare le mot de passe clair avec le mot de passe hashé
        const isPasswordMatching = await bcrypt.compare(body.password, user.password)
        // Si ça renvoie false on retoure une erreur 401 avec le message Connexion 
        if(!isPasswordMatching) return res.status(401).json({message : "Connexion non autorisée"})
        // *** Si tout est bon on renvoie un token de connexion
        res.status(200).json({
            userId : user._id,
            token :jwt.sign({userId :user._id}, "SECRET_KEY", {expiresIn : "5h"})
            //authentification le serveur vérifie que le token de l'utilisateur est valide signé,avec le code secret
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

