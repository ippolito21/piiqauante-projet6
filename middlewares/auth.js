const passport = require('passport')
const passportJWT = require('passport-jwt')
const UserModel = require('../models/user.model')

// Module authentification
passport.use(
    // Definition du stategie basée sur Du json web token
    new passportJWT.Strategy({
        // ** extraction du token avec la methode Bearer
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "SECRET_KEY"
    },
       // extraction du payload
        async function (payload, done) {
            try {
                // on cherche l'utilisateur dans la base de données avec l'identifiant fourni au niveau du payload
                const user = await UserModel.findById(payload.userId)
                // ** Si c'est bon on retourne l'utilisateur et on permet l'acces
                return done(null, user)
            } catch (error) {
                // ** On retourne l'eereur l'authentification à echouer
                return done(error)
            }
        }
    )
)