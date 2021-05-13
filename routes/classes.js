const express = require("express"),
      router = express.Router();


// Importing controller
const courseController = require('../controllers/classes');

// Browse books
router.get("/classes/getall", courseController.getClasses);
module.exports = router;