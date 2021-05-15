const express = require("express"),
      router = express.Router();


// Importing controller
const projectController = require('../controllers/project');

// Browse books
router.get("/project/:filter/:value/:page", projectController.getProject);

// Fetch books by search value
router.post("/project/:filter/:value/:page", projectController.findProject);

// Fetch individual book details
router.get("/project/details/:project_id", projectController.getProjectDetails);

module.exports = router;