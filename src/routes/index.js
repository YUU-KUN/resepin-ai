const express = require('express');
const authRoutes = require('./authRoutes');
const userCreationRoutes = require('./userCreationRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user-creations', userCreationRoutes);

module.exports = router;
