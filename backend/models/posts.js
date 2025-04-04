const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['jackets/coats', 'sweaters', 'fancy tops', 'casual tops', 'pants', 'jeans', 'shorts', 'skirts', 'dresses', 'bags', 'accessories', 'athletic/sporty'], // Enum to restrict the category to specific values
        },
        size: {
            type: String,
            required: true,
        },
        avaibility: {
            type: Boolean,
            default: true,
        },
        photo: {
            type: String,
        },
        moreInfo: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comments: [commentSchema],
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;