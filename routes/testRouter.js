const expresss = require('express');
const sampleController = require('../controllers/testController');
console.log("in test router");

const router = expresss.Router();

// Define routes and associate them with controller functions
router.get('/', sampleController.index);
router.get('/about', sampleController.about);


module.exports = router;