const User = require('../models/user');

module.exports = {
    getAmigo,
    index,
    addAmigo,
    removeAmigo,
};

// get freind's info functionality 
async function getAmigo(req, res) {
    try {
        const user = await User.findById(req.user._id).populate('amigos');
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function index(req, res) {
    try {
        const users = await User.find({})
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({err});
    }
}

// add friend functionality 
async function addAmigo(req, res) {
    try {
        const user = await User.findById(req.user._id);
        const amigo = await User.findById(req.params.amigoId);
        if (!amigo) {
            return res.status(400).json({ message: 'amigo not found.' });
        }
        if (user.amigos.includes(amigo._id)) {
            return res.status(400).json({ message: 'already amigos.' });
        }
        user.amigos.push(amigo._id);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

// remove friend functionality
async function removeAmigo(req, res) {
    try {
        const user = await User.findById(req.user._id); 
        const amigo = await User.findById(req.params.amigoId);
        if (!amigo) {
            return res.status(400).json({ message: 'amigo not found.' });
        }
        user.amigos = user.amigos.filter(amigoId => !amigoId.equals(amigo._id));
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


