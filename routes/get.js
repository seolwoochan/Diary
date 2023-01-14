// ****** GET ****** //

const express = require('express');
const router = express.Router();

const writes = require('../models/write');

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

router.get('/logout', (req, res) => {
    if (req.session.login) req.session.destroy();
    res.redirect('/');
});

router.get('/register', (req, res) => {

    if (req.session.login) return res.redirect('/');

    res.render('register.ejs');
});

router.get('/diary', (req, res) => {

    if (!req.session.login) return res.redirect('/');
    writes.find({ userId: req.session.login.userId }).then((data) => {
        data = data.reverse();
        res.render('diary.ejs', { items: data });
    });
});

router.get('/diary/write', (req, res) => {
    
    if (!req.session.login) return res.redirect('/');

    res.render('diary_write.ejs');
});

router.get('/diary/rewrite/:unique', (req, res) => {

    if (!req.session.login) return res.redirect('/');

    const get_unique = req.params.unique;

    writes.findOne({ unique: get_unique }).then((data) => {
        if (data != null && req.session.login.userId == data.userId) {
            res.render('diary_rewrite.ejs', {
                data: data
            });
        }
        else {
            res.send(`<script>alert('수정하실 수 없습니다');window.history.back();</script>`);
        }
    });

});

router.get('/diary/:unique', (req, res) => {
    
    const get_unique = req.params.unique;

    writes.findOne({ unique: get_unique }).then((data) => {
        if (data != null) {
            res.render("view.ejs", { data: data });
        }
        else {
            res.send("요청하신 URL은 잘못된 방식입니다");
        }
    });

});

module.exports = router;