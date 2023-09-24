const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.use(express.json());

router.get('/', homeController.getHome);
router.post('/add-message', homeController.addMessage);

module.exports = router;
