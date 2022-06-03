//limiter le nombre de requête dans l'api, dans un interval temps pour une adresse d'inscription
const expressLimiter = require('express-rate-limit')

const limiter = expressLimiter({
    windowMs: 10 * 60 * 1000, 
	max: 100, 
	standardHeaders: true,
	legacyHeaders: false, 
})
// Le client pourra  faire 100 requêtes toutes les 10 minutes
module.exports = {limiter}