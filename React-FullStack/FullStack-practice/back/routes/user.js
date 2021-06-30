const express = require('express');
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');
const router = express();
const passport = require('passport');

router.post('/login', (req,res,next) => {
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
router.post('/', async (req,res,next) => {
    try{
        console.log(req.body);
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