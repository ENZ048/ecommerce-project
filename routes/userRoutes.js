const express = require('express');
const router = express.Router();
const app = express();
const userController = require('../controllers/userController');

app.post('/register', userController.registerUser);

app.post('/login', userController.loginUser);

app.get('/logout', userController.logoutUser);

module.exports = router;