const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Patient = require('../models/Patient')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET


module.exports = (passport)=> {
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await Patient.findOne({ _id: jwt_payload.sub })
            if (!user) return done(null, false);
            else return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }));

}