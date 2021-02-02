const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../config/database');
const UserModel = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findAll({
        where: { id: id }
    }).then(users => done(users[0]))
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        User.findAll({
            raw: true,
            where: { email: email }
        }).then(users => {
            if (users === undefined || users.length == 0) {
                return done(null, false, { message: "User not found" });
            } else {
                const user = users[0];
                let loginAttemptsCount = req.body.loginAttemptsCount || user.loginAttemptsCount;
                if (loginAttemptsCount) {
                    UserModel.comparePassword(password, user.password, (err, response) => {
                        if (err) { return done(err); }
                        if (response) {
                            if (user.expirePassword && user.expiryDate < Date.now()) {
                                return done(null, false, { message: 'Password expired!' });
                            }
                            loginAttemptsCount = user.loginAttempts;
                            User.update(
                                { loginAttemptsCount: loginAttemptsCount },
                                { where: { id: user.id } })
                            return done(null, user);
                        } else {
                            loginAttemptsCount--;
                            User.update(
                                { loginAttemptsCount: loginAttemptsCount },
                                { where: { id: user.id } })
                            return done(null, false, { success: response, message: 'Incorrect password.' });
                        }
                    });
                } else {
                    return done(null, false, { message: 'Login attempts reached the limit.' });
                }
            }
        });
    }
));
