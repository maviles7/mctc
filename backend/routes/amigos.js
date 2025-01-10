const express = require('express');
const router = express.Router();

const amigosCtrl = require('../controllers/amigos');  

// all paths start w/ 'api/user'

//add friend
router.post('/add-amigo/:amigoId', amigosCtrl.addAmigo);

// remove friend
router.delete('/remove-amigo/:amigoId', amigosCtrl.removeAmigo);

module.exports = router; 
