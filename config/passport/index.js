const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../models/schemas');
const User = connection.models.users;
const bcrypt = require('bcrypt');

const customFields = {              //Change to suit the project
    usernameField: 'username',
    passwordField: 'userPassword'
}

const verifyCallback = async (username, password, done) => {

    const user = await User.findOne({username:username})

    if(!user) {
        return done(null, false);
    };

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        return done(null, user);
    } else {
        return done(null, false);
    };
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId).then((user) => {
        done(null,user);
    }).catch(err => done(err))
});

module.exports = 
    passport.use(
        new LocalStrategy(customFields, verifyCallback)
    );