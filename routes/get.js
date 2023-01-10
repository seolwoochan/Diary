// ****** GET ****** //

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    let isLogin = false;
    let userId = '';

    if (req.session.login) {
        isLogin = true;
        userId = req.session.login.userId;
    }

    res.render('root.ejs', { isLogin: isLogin, userId: userId });
});

router.get('/login', (req, res) => {

    if (req.session.login) return res.redirect('/');

    res.render('login.ejs');
});

router.get('/register', (req, res) => {

    if (req.session.login) return res.redirect('/');

    res.render('register.ejs');
});

router.get('/diary', (req, res) => {

    if (!req.session.login) return res.redirect('/');

    res.render('diary.ejs');
});

router.get('/diary/write', (req, res) => {
    
    if (!req.session.login) return res.redirect('/');

    res.render('diary_write.ejs');
});

module.exports = router;