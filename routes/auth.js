const express = require("express"),
      router = express.Router(),
      passport = require('passport');


// Import index controller
const authController = require('../controllers/auth');

// Import models
const User = require("../models/user");

//landing page
router.get('/', authController.getLandingPage);

//admin login handler

//user login handler
router.get("/auth/user-login", authController.getUserLoginPage);

router.post("/auth/user-login", passport.authenticate("local", {
        successRedirect : "/user/1",
        failureRedirect : "/auth/popup"
    }), (req, res)=> {
        MAX_LOGIN_ATTEMPTS -=1
});

//fpass
router.post("/auth/user-fpass", authController.forgotValidation);


router.get("/auth/popup", authController.getpopup);
router.get("/auth/user-fpass", authController.getUserforgotpass);
router.get("/auth/user-resetlink", authController.getUserresetlink);
router.get("/auth/user-todo", authController.getUsertodo);
router.get("/auth/user-cal", authController.getUsercal);
router.get("/auth/user-news", authController.getUsernewsindex);
router.get("/auth/user-fpassw",authController.postUserforgotpass);
//user -> user logout handler
router.get("/auth/user-logout", authController.getUserLogout);


//user sign up handler
router.get("/auth/user-signUp", authController.getUserSignUp);
router.get("/auth/user-gsignUp", authController.getgUserSignUp);



router.post("/auth/user-signup", authController.postUserSignUp);

router.get("/auth/admin-support", authController.getAdminSupport)
router.post("/auth/admin-support", authController.postAdminSupport)

module.exports = router;