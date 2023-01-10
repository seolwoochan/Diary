// ****** POST ****** //

const express = require('express');
const router = express.Router();

const accounts = require('../models/account');

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
    const get_userPw = req.body.userPw.replace(" ", "");;

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

module.exports = router;