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
            enum: ['jackets/coats', 'sweaters', 'tops', 'pants', 'jeans', 'shorts', 'skirts', 'dresses'],
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
        commentss: [commentSchema],
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;