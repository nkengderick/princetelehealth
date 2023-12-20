const express = require('express');

const upload = require('../middlewares/multerupload')

const userController = require('../controllers/userController')

const router = express.Router();

// Get all users
router.get('/all', userController.getAllUsers);

// Create a new user
router.post('/create', upload.single('image'), userController.createUser);

// log in user
router.post('/login', userController.getUserByUsernameAndPassword);

// Get one user by ID
router.get('/:id', userController.getOneUser);

module.exports = router;
