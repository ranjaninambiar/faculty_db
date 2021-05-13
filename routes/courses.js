const express = require("express"),
      router = express.Router();


// Importing controller
const courseController = require('../controllers/courses');

// Browse books
router.get("/courses/:filter/:value/:page", courseController.getCourses);

// Fetch books by search value
router.post("/courses/:filter/:value/:page", courseController.findCourses);

// Fetch individual book details
router.get("/courses/details/:course_id", courseController.getCourseDetails);

module.exports = router;