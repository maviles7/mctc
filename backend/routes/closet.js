const express = require('express');
const router = express.Router();

const closetCtrl = require('../controllers/closet');  

// all paths start w/ 'api/closet'

// add post to closet
router.post('/add-item/:postId', closetCtrl.addItem);

// remove post from closet
router.delete('/remove-item/:postId', closetCtrl.removeItem);

module.exports = router;