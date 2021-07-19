const express = require('express');
const { User, Post, Comment, Image } = require('../models');
const bcrypt = require('bcrypt');
const router = express();
const { Op } = require('sequelize');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => {
    try{
        console.log(req.headers);
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
        console.error(err);
        next(err);
    }
})

router.get('/followers', isLoggedIn, async (req, res, next) => {
    try{
        // const followers = null;
        // if(!req.query.offset){
        //     followers = await req.user.getFollowers({
        //         limit: 3,
        //     });
        // }else {
        //     followers = await req.user.getFollowers({
        //         limit: 3,
        //         offset: parseInt(req.query.offset, 10),
        //     });
        // }
        const followers = await req.user.getFollowers({
            limit: parseInt(req.query.limit, 10),
            // offset: parseInt(req.query.offset, 10),
        });
        res.status(200).json(followers);
    }catch(err) {
        console.error(err);
        next(err);
    }
});
router.get('/followings', isLoggedIn, async (req, res, next) => {
    try{
        const followings = await req.user.getFollowings({
            limit: parseInt(req.query.limit, 10),
            // offset: parseInt(req.query.offset, 10),
        });
        res.status(200).json(followings);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/:userId/posts', async (req, res, next) => {
    try{
        const where = { UserId: parseInt(req.params.userId) };
        if(parseInt(req.query.lastId, 10)){
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
                ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }],
        });
        res.status(200).json(posts);
    }catch(err){
        console.error(err);
        next(err);
    }
})

router.get('/:userId', async (req, res, next) => {
    try{
        const fullUserWithoutPassword = await User.findOne({
            where: { id: parseInt(req.params.userId) },
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
        });
        if(fullUserWithoutPassword) {
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length;
            data.Followers = data.Followers.length;
            data.Followings = data.Followings.length;
            res.status(200).json(data);
        }else{
            res.status(404).json('존재하지 않는 사용자입니다.');
        }
    }catch(err){
        console.error(err);
        next(err);
    }
})

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

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id },
        });
        res.status(200).json({ nickname: req.body.nickname });
    }catch(err) {
        console.error(err);
        next(err);
    }
})

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if (!user) {
        res.status(403).send('없는 사람을 팔로우하려고 하시네요?');
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if (!user) {
        res.status(403).send('없는 사람을 언팔로우하려고 하시네요?');
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { // DELETE /user/follower/2
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if (!user) {
            res.status(403).send('존재하지 않는 유저입니다.');
        }
        await user.removeFollowings(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;