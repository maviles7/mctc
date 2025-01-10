const path = require('path'); 
const express = require('express');
const logger = require('morgan');
const app = express();


require('dotenv').config();

// connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());

app.use(require('./middleware/checkToken'));

// API Routes
app.use('/api/auth', require('./routes/auth'));
const ensureLoggedIn = require('./middleware/ensureLoggedIn');
app.use('/api/posts', ensureLoggedIn, require('./routes/posts'));
app.use('/api/user', ensureLoggedIn, require('./routes/amigos'));
// app.use('/api/users', ensuredLoggedIn, require('./routes/comments'));

app.get('*', function (req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});
