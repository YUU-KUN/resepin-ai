const express = require('express');
const { getUserCreations, createUserCreation, scanNutrientFacts } = require('../controllers/userCreationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getUserCreations);
router.post('/', authMiddleware, createUserCreation);
router.post('/nutrient-facts', authMiddleware, scanNutrientFacts);

module.exports = router;
