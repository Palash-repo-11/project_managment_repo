
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_OPTION } = require('./config');
const { users } = require('./repo/usersRepo');

passport.use(new GoogleStrategy({
    clientID: GOOGLE_OPTION.CLIENT_ID,
    clientSecret: GOOGLE_OPTION.CLIENT_SECRET,
    callbackURL: GOOGLE_OPTION.REDIRECT_URI
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile._json,"profile")
    let { sub, name, email, picture, email_verified } = profile._json
    // let { sub, name, picture } = profile._json
    let user = await users.findByEmail(email)
    if (!user) {
        user = await users.insertUser(sub, email, name, picture)
    }

    return done(null, user)
}))
