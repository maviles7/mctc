const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const closetSchema = new Schema(
    {
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Closet', closetSchema);