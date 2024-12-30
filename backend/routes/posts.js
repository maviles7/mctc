const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');  

// all paths start w/'api/posts'

// GET /api/posts --> INDEX FUNCTIONALITY 
router.get('/', postsCtrl.index);

// POST /api/posts --> CREATE FUNCTIONALITY
router.post('/', postsCtrl.create);

module.exports = router;