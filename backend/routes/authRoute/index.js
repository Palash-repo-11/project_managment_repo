const router = require('express').Router();
const passport = require('passport');
require('../../passport.setup')

router.get('/google', passport.authenticate('google', {
    scope: ['profile',"email"]
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    console.log("login success")
    res.redirect('http://localhost:3000/profile');
});

module.exports = router
