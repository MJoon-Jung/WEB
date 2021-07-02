const express = require('express');
const router = express.Router();
const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/', isLoggedIn, async (req, res, next) => {
    try{
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
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
                }]
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }],
        })
        res.status(201).json(fullPost);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try{ 
        const post = await Post.findOne({
            where: { id: parseInt(req.params.postId) },
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            UserId: req.user.id,
            PostId : parseInt(req.params.postId),
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [ {
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })
        res.status(201).json(fullComment);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try{
        const postId = parseInt(req.params.postId);        
        const post = await Post.findByPk(postId);
        if(!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    }catch(err) {
        console.error(err);
        next(err);
    }
})
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
    try{
        const postId = parseInt(req.params.postId);
        const post = await Post.findByPk(postId);
        if(!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    }catch(err) {
        console.error(err);
        next(err);
    }
})
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
    try{
        const postId = parseInt(req.params.postId);
        const post = await Post.findOne({
            where: {
                id: postId,
                UserId: req.user.id,
            },
        });
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        await post.destroy();
        res.status(200).send('게시글이 삭제되었습니다.');
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;