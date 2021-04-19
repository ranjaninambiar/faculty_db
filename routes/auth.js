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
/*
router.get("/auth/admin-login", authController.getAdminLoginPage)

router.post("/auth/admin-login", passport.authenticate("local", {
        successRedirect : "/admin",
        failureRedirect : "/auth/admin-login",
    }), (req, res)=> {
});
*/
//admin logout handler
/*
router.get("/auth/admin-logout", authController.getAdminLogout);
*/

// admin sign up handler
/*
router.get("/auth/admin-signup", authController.getAdminSignUp);

router.post("/auth/admin-signup", authController.postAdminSignUp);
*/
//user login handler
router.get("/auth/user-login", authController.getUserLoginPage);

router.post("/auth/user-login", passport.authenticate("local", {
        successRedirect : "/user/1",
        failureRedirect : "/auth/popup"
    }), (req, res)=> {
        MAX_LOGIN_ATTEMPTS -=1
});

// router.post("/auth/user-fpass", function (req, res) {
//     User.findOne({'email': req.body.email}, function (err, user) {
//         // if there are any errors, return the error
//         if (err) {
//             return done(err);
//         }
//         console.log(typeof(window))
//         if (user) {
//             setTimeout(function() {
//                 window.location.href = "/auth/user-fpassw";
//             }, 3000);

//         } else {
//             setTimeout(function() {
//                 window.location.href = "/auth/popup";
//             }, 3000);
           
//         }}
//         )});
router.get("/auth/popup", authController.getpopup);
router.get("/auth/user-fpass", authController.getUserforgotpass);
router.get("/auth/user-resetlink", authController.getUserresetlink);
router.get("/auth/user-todo", authController.getUsertodo);
router.get("/auth/user-cal", authController.getUsercal);
router.get("/auth/user-fpassw",authController.postUserforgotpass);
//user -> user logout handler
router.get("/auth/user-logout", authController.getUserLogout);



//user sign up handler
router.get("/auth/user-signUp", authController.getUserSignUp);
router.get("/auth/user-gsignUp", authController.getgUserSignUp);




router.post("/auth/user-signup", authController.postUserSignUp);

module.exports = router;