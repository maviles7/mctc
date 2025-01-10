const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');

// all paths start w/ 'api/'

// POST /api/comments/:postId --> CREATE FUNCTIONALITY
router.post('/posts/:postId/comments', commentsCtrl.create);

// DELETE /api/comments/:postId/:commentId --> DELETE FUNCTIONALITY
router.delete('/posts/:postId/comments/:commentId', commentsCtrl.deleteComment);

// PUT /api/comments/:postId/:commentId --> UPDATE FUNCTIONALITY
router.put('/posts/:postId/comments/:commentId', commentsCtrl.update);

module.exports = router;