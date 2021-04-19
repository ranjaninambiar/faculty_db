// importing libraries
const passport = require("passport");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// importing models
const User = require("../models/user");

exports.getLandingPage = (req, res, next) => {
  res.render("landing");
};

exports.getAdminLoginPage = (req, res, next) => {
  res.render("admin/adminLogin");
};

exports.getAdminLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

exports.getAdminSignUp = (req, res, next) => {
  res.render("signup");
};

//fpass
exports.forgotValidation = async (req, res, next) =>{
    User.findOne({'email': req.body.email}, function (err, user) {
        // if there are any errors, return the error
        console.log('authjs')
        if (err) {
            return done(err);
        }
        
        if (user) {
            setTimeout(function() {
                res.redirect("/auth/user-fpassw");
            }, 3000);

        } else {
            setTimeout(function() {
                res.redirect("/auth/popup");
            }, 3000);
           
        }}
        )
}

exports.postAdminSignUp = async (req, res, next) => {
  try {
    if (req.body.adminCode === process.env.ADMIN_SECRET) {
      const newAdmin = new User({
        username: req.body.username,
        email: req.body.email,
        isAdmin: true,
      });

      const user = await User.register(newAdmin, req.body.password);
      await passport.authenticate("local")(req, res, () => {
        req.flash(
          "success",
          "Hello, " + user.username + " Welcome to Admin Dashboard"
        );
        res.redirect("/admin");
      });
    } else {
      req.flash("error", "Secret code does not matching!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash(
      "error",
      "Given info matches someone registered as User. Please provide different info for registering as Admin"
    );
    return res.render("signup");
  }
};

exports.getUserLoginPage = (req, res, next) => {
  res.render("user/userLogin");
};
exports.getpopup = (req, res, next) => {
  res.render("user/popup");
};


exports.getUserforgotpass = async(req, res, next) => {
res.render("user/forgotpass");
};

exports.getUserresetlink = (req, res, next) => {
  res.render("user/resetpass");
};
exports.getUserLogout = async (req, res, next) => {
  await req.session.destroy();
  req.logout();
  res.redirect("/");
};

exports.getUsertodo = (req, res, next) => {
  res.render("user/todo");
};

exports.getUsercal = (req, res, next) => {
  res.render("user/calender");
};

exports.getUserSignUp = (req, res, next) => {
  res.render("user/userSignup");
};

exports.getgUserSignUp = (req, res, next) => {
  res.render("user/guserSignup");
};


exports.postUserforgotpass = async (req, res, next) => {

  let nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
      user: 'ranjuparker@gmail.com',
      pass: 'gnqtqfejgzsguwdr'
    }
    });
    module.exports = transporter;
  

var mailOptions = {
  from: 'ranjuparker@gmail.com',
  to: req.body.email,
  subject: 'Forgot password in Admindek',
  text: 'Your password reset request from Admindek!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  
  }
});
return res.render("user/resetpass");
};
exports.postUserSignUp = async (req, res, next) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
    });

    await User.register(newUser, req.body.password);
    await passport.authenticate("local")(req, res, () => {
      res.redirect("/user/1");
    });


    let nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
      user: 'ranjuparker@gmail.com',
      pass: 'gnqtqfejgzsguwdr'
    }
    });
    module.exports = transporter;




    

var mailOptions = {
  from: 'ranjuparker@gmail.com',
  to: req.body.email,
  subject: 'Sending Email using Node.js',
  text: 'Welcome to Admindek!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

    
  } catch (err) {
    console.log(err);
    return res.render("user/userSignup");
  }
};


