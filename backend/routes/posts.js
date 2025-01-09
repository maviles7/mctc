const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');  

// all paths start w/'api/posts'

// GET /api/posts --> INDEX FUNCTIONALITY 
router.get('/', postsCtrl.index);

// GET /api/posts/:id --> SHOW FUNCTIONALITY
router.get('/:postId', postsCtrl.show);

// POST /api/posts --> CREATE FUNCTIONALITY
router.post('/', postsCtrl.create);

// PUT /api/posts/:id --> UPDATE FUNCTIONALITY
router.put('/:postId', postsCtrl.update);

module.exports = router;