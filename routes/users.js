// importing modules
const express = require("express"),
      router = express.Router(),
      middleware = require("../middleware");

// importing controller
const userController = require('../controllers/user');

// user -> dashboard
router.get("/user/:page", middleware.isLoggedIn, userController.getUserDashboard);

// user -> profile
router.get("/user/:page/profile", middleware.isLoggedIn, userController.getUserProfile);

router.get("/user/todo",middleware.isLoggedIn, userController.gettodo);

router.get("/user/calender",middleware.isLoggedIn, userController.getcal);

//user -> upload image
router.post("/user/1/image", middleware.isLoggedIn, userController.postUploadUserImage);

//user -> update password
router.put("/user/1/update-password", middleware.isLoggedIn, userController.putUpdatePassword);

//user -> update profile
router.put("/user/1/update-profile", middleware.isLoggedIn, userController.putUpdateUserProfile);

//user -> Projects
router.get("/user/1/project/add", middleware.isLoggedIn, userController.getAddNewProject);
router.post("/user/1/project/add", middleware.isLoggedIn, userController.postAddNewProject);

router.get("/user/1/projectInventory/:filter/:value/:page", middleware.isLoggedIn, userController.getUserProjectInventory);
router.post("/user/1/projectInventory/:filter/:value/:page",middleware.isLoggedIn, userController.postUserProjectInventory);

router.get("/user/1/project/update/:project_id", middleware.isLoggedIn, userController.getUpdateProject);
router.post("/user/1/project/update/:project_id", middleware.isLoggedIn,userController.postUpdateProject);
router.get("/user/1/project/delete/:project_id", middleware.isLoggedIn, userController.getDeleteProject);



//user -> notification
router.get("/user/1/notification", middleware.isLoggedIn, userController.getNotification);

router.get("/user/1/courses",middleware.isLoggedIn,userController.coursespage );
router.get("/students/add/:student_id/:class_id", middleware.isLoggedIn, userController.getstudform);
router.post("/students/add/:student_id/:class_id", middleware.isLoggedIn, userController.poststudform);
router.post("/students/add/:class_id/enroll/:user_id", middleware.isLoggedIn, userController.postAddstudents);
router.get("/user/1/courses/add", middleware.isLoggedIn, userController.getAddNewCourse);
router.post("/user/1/courses/add", middleware.isLoggedIn, userController.postAddNewCourse);
router.get("/user/1/classes/add/:user_id", middleware.isLoggedIn, userController.getAddNewClass);
router.post("/user/1/classes/add/:user_id", middleware.isLoggedIn, userController.postAddNewClass);
router.get("/user/1/courses/quizindex", middleware.isLoggedIn, userController.getQuizindex);
//to post attendance index
router.post("/students/attendance/:class_id", middleware.isLoggedIn, userController.postattendance);

//to mark present and absent
router.get("/students/present/:student_id/:class_id", middleware.isLoggedIn, userController.getpresent);
router.get("/students/absent/:student_id/:class_id", middleware.isLoggedIn, userController.getabsent);

router.get('/user/1/notes-new', middleware.isLoggedIn,userController.notespage );
router.get('/user/1/notes-newnote', middleware.isLoggedIn,userController.newnotepage );
router.post('/:id',middleware.isLoggedIn,userController.deletenote );
router.post('/user/1/notes-newnote', middleware.isLoggedIn, userController.postnotes);

router.get("/user/1/courseInventory/:filter/:value/:page", middleware.isLoggedIn, userController.getUserCourseInventory);

// admin -> show searched books
router.post("/user/1/courseInventory/:filter/:value/:page",middleware.isLoggedIn, userController.postUserCourseInventory);

//admin -> show books to be updated
router.get("/user/1/course/update/:course_id", middleware.isLoggedIn, userController.getUpdateCourse);

//admin -> update book
router.post("/user/1/course/update/:course_id", middleware.isLoggedIn,userController.postUpdateCourse);

//admin -> delete book
router.get("/user/1/course/delete/:course_id", middleware.isLoggedIn, userController.getDeleteCourse);

router.get("/courses/:course_id/issue/:user_id", middleware.isLoggedIn, userController.postIssueCourse);


// user -> delete user account
router.delete("/user/1/delete-profile", middleware.isLoggedIn, userController.deleteUserAccount);

module.exports = router;