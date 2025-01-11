const User = require("../models/user");
const Post = require("../models/posts");

module.exports = {
  addItem,
};

// add post to closet functionality
async function addItem(req, res) {
  try {
    // console.log("req.user._id:", req.user._id);
    const user = await User.findById(req.user._id);
    // console.log("user:", user);
    const post = await Post.findById(req.params.postId);
    // console.log("post:", post);

    if (!post) {
      return res.status(404).json({ message: "item not found." });
    }
    if (user.closet.includes(post._id)) {
      return res.status(400).json({ message: "item already in closet." });
    }
    user.closet.push(post._id);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}