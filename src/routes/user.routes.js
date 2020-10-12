const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const { renderUserProfile, renderEditUserProfile, editUserProfile } = require('../controllers/user.controller');

router.get('/profile', isLoggedIn, renderUserProfile);
router.get('/profile/edit/:id', isLoggedIn, renderEditUserProfile);
router.post('/profile/edit/:id', isLoggedIn, editUserProfile);

module.exports = router;
