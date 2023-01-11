// ****** POST ****** //

const express = require('express');
const router = express.Router();

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const accounts = require('../models/account');
const writes = require('../models/write');

router.post('/login', (req, res) => {
    const get_userId = req.body.userId.replace(" ", "");
    const get_userPw = req.body.userPw.replace(" ", "");;

    if (get_userId == '' || get_userPw == '') return res.send('401');

    accounts.findOne({ userId: get_userId }).then((data) => {
        if (data == null) return res.send('404');
        else {
            if (data.userPw != get_userPw) return res.send('403');
            else {
                req.session.login = {
                    userId: get_userId,
                    userPw: get_userPw
                }
                return res.send('200');
            }
        }
    });
});

router.post('/register', (req, res) => {
    const get_userId = req.body.userId.replace(" ", "");
    const get_userPw = req.body.userPw.replace(" ", "");

    if (get_userId == '' || get_userPw == '') return res.send('401');

    accounts.findOne({ userId: get_userId }).then((data) => {
        if (data != null) return res.send('404');
        else {
            new accounts({
                userId: get_userId,
                userPw: get_userPw
            }).save().then(() => res.send('200'));
        }
    });
});

router.post('/write', (req, res) => {
    const get_title = req.body.title;
    const get_content = req.body.content;

    const unique = Math.random().toString(36).slice(2);

    let date = moment().format('YYYY-MM-DD HH:mm:ss');

    if (req.session.login) {
        new writes({
            userId: req.session.login.userId,
            userTitle: get_title,
            userContent: get_content,
            unique: unique,
            time: date
        }).save().then(() => {});
    }
    res.redirect('/diary');
});

router.post('/trash', (req, res) => {
    const get_unique = req.body.unique;

    if (!req.session.login) return res.send('404');

    writes.findOne({ unique: get_unique }).then((data) => {
        if (data != null) {
            if (req.session.login.userId == data.userId) {
                writes.deleteOne({ unique: get_unique }).then(() => res.send('done'));
            }
            else {
                res.send("404");
            }
        }
    });
});

module.exports = router;