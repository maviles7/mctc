const Post = require('../models/posts');

module.exports = {
    index,
    create,
    show,
};

// INDEX FUNCTIONALITY
async function index(req, res) {
    try {
        const posts = await Post.find({})
            .populate('owner')
            .sort({createdAt: "desc"});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({err});
    }
};

// SHOW FUNCTIONALITY
async function show(req, res) {
    try {
        const post = await Post.findById(req.params.id)
            .populate('owner')
            //.populate({ path: "comments", populate: { path: "owner" } });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({err});
    }
}

// CREATE FUNCTIONALITY
async function create(req, res) {
    console.log('user:', req.user);
    console.log('body:', req.body);
    try {
        req.body.owner = req.user._id;
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({err});
    }
};