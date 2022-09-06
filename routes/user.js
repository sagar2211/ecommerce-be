const express = require('express')
const router = express.Router();
const { createNewUser, updateUser, deleteUser, getAllUser, getUser, uploadProfilePic } = require('../controllers/userController');
const { validateUser } = require('../UserValidator');

// create User
router.post('/create',validateUser, createNewUser);

// update User
router.patch('/update', updateUser);

// delete user
router.delete('/delete/:id', deleteUser);

// get All User
router.get('/all', getAllUser);

// get User
router.get('/:id', getUser);

router.post("/upload-profile", uploadProfilePic);

module.exports = router;