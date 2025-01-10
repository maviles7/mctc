const Post = require('../models/posts');

module.exports = {
    create,
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