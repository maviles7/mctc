const Post = require('../models/posts');

module.exports = {
    index,
    create,
    show,
    update,
}

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
        const post = await Post.findById(req.params.postId)
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

// UPDATE FUNCTIONALITY
async function update(req, res) {
    try {
        // check permissions 
        const post = await Post.findById(req.params.postId);
        if(!post) {
            return res.status(404).json({msg: 'post not found.'});
        }

        if(!post.owner.equals(req.user._id)) {
            return res.status(401).json({msg: 'not authorized.'});
        };

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            req.body, 
            {new: true}
        );
        updatedPost._doc.owner = req.user;
        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({err});
    }
};