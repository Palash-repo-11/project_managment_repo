const express = require('express')
const pool = require('./pool')
const passport = require('passport')
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const { PORT, OPTIONS, COOKIE_DOMAIN, SESSION_SECRET } = require('./config')
const authRoutes = require('./routes/authRoute');
const { users } = require('./repo/usersRepo');
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    store: new pgSession({
        pool: pool,
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        domain: COOKIE_DOMAIN,
        // sameSite: "none",
        // maxAge: 60000
        maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
}))



app.use(passport.initialize())
app.use(passport.session());


app.get('/', (req, res) => {
    res.send('WELCOME')
})

const sample = 'user'

passport.serializeUser(function (sample, done) {
    done(null, sample);
});

passport.deserializeUser(async function (id, done) {

    const user = await users.findById(id)


    if (user) {
        return done(null, user);
    }
    return done(null, null);
});

app.use('/auth', authRoutes);

pool.connect(OPTIONS).then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER STARTED IN PORT: ${PORT}`)
    })
})