const dotenv     = require('dotenv').config();
const express    = require('express');
const router     = express();

const passport       = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy  = require('passport-local');

const controller = require('../controller/userController.cjs');
const { ensureAuth } = require('../util/authUtil.cjs');

passport.use(new LocalStrategy({
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
        failureMessage: true
    },
    function verify(username, password, done) {
        controller.verifyUser(username, password).then((result) => {
            done(null, result[0]);
        });
    }
));

passport.serializeUser(function(user, done) {
    process.nextTick(function() {
        return done(null, {
            id: user._id,
            username: user.username,
        });
    });
});

passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
        try {
            controller.findUserById(user.id).then((result) => {
                if (!result) throw new Error('User does not exist');
                return done(null, result);
            })
        } catch (err) {
            console.error(err.message);
        }
    });
});

router.post('/auth/login/', passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true
}), (req, res) => {
    res.status(200).send({success: true});
});

router.post('/register', (req, res) => {
    try {
        controller.insertUser(req.body).then((result) => {
            res.status(200).send(result);
        })
    } catch (error) {
        console.error(error);
    }
});

router.get('/check', ensureAuth,
    function (req, res, next) {
        next();
    });


module.exports = router;
