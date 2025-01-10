const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');

// all paths start w/ 'api/'

// POST /api/comments/:postId --> CREATE FUNCTIONALITY
router.post('/posts/:postId/comments', commentsCtrl.create);

module.exports = router;