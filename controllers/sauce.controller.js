const express = require('express')
const SauceModel = require('../models/sauce.model')
/** 
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.createSauce = async (req, res) => {
    const body = req.body
    // on recupere les données relatives à la sauce comme le names , description etc...
    const sauce = { ...JSON.parse(body.sauce) }

    try {
        // on crée un nouveau document sauce avec les les données de la sauce ainsi que l'imageUrl
        await new SauceModel({
            ...sauce,
            imageUrl: `${req.protocol}://${req.get('host')}/public/images${req.file.filename}`
        }).save()
        // ** On retourne un message de creation avec un status code de 201
        res.status(201).json({ message: "Created Sauce" })
    } catch (error) {
        // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré   
        res.status(500).json(error)
    }
}

