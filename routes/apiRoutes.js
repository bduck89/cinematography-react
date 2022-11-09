const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const connection = require('../config/models/schemas');
const User = connection.model('users');
const { SALT_ROUNDS } = require('../config/keys');
const adminPasswordCheck = require('../middleware/adminPassword').adminPasswordCheck;
const { isAuth } = require('../middleware/authMiddleware');

// Post Routes
router.post('/login', passport.authenticate('local', {failureRedirect: '/api/login-failure', successRedirect: '/api/dashboard'}));

router.post('/register', adminPasswordCheck, async(req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.userPassword, SALT_ROUNDS),
        admin: true
    });
    
    const user = await newUser.save()  
    
    res.status(201).send(user);
 });

// Visiting this route logs the user out
router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
  });

router.get('/dashboard', isAuth, (req, res) => {
    res.send('Login Success')
});

module.exports = router;