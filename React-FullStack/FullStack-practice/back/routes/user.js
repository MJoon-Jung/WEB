const express = require('express');
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');
const router = express();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => {
    try{
        if(req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            res.status(200).json(fullUserWithoutPassword);
        }else {
            res.status(200).json(null);
        }
    }catch(err) {
        console.log(err);
        next(err);
    }
})

router.post('/login', isNotLoggedIn, (req,res,next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            next(err);
        }
        if(info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req,res,next);
});

router.post('/logout', isLoggedIn, (req,res,next) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});
router.post('/', isNotLoggedIn, async (req,res,next) => {
    try{
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = await User.create({
            email: req.body.email,
            nickname: req.body.nick,
            password: hashedPassword,
        });
        res.status(201).send('ok');
    }catch(err){
        console.error(err);
        next(err); //status 500
    }
});

module.exports = router;