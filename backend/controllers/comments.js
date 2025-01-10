const Post = require('../models/posts');

module.exports = {
    create,
    deleteComment,
    update,
};

// CREATE COMMENT FUNCTIONALITY 
async function create(req, res) {
    try {
        req.body.owner = req.user._id;
        const post = await Post.findById(req.params.postId);
        post.comments.push(req.body);
        await post.save();

        // find the new comment and populate the owner field
        const newComment = post.comments[post.comments.length - 1];
        newComment._doc.owner = req.user;

        // respond w/ the new comment
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE COMMENT FUNCTIONALITY
async function deleteComment(req, res) {
    try {
        const post = await Post.findById(req.params.postId);
        post.comments.remove({ _id: req.params.commentId });
        await post.save();
        res.status(200).json({ message: 'comment deleted.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE COMMENT FUNCTIONALITY
async function update(req, res) {
    try {
        const post = await Post.findById(req.params.postId);
        const comment = post.comments.id(req.params.commentId);
        comment.text = req.body.text;
        await post.save();
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
};