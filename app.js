const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  session = require("express-session"),
  passport = require("passport"),
  
  multer = require("multer"),
   dotenv = require("dotenv"),
 
  path = require("path"),
  //sanitizer = require("express-sanitizer"),
  methodOverride = require("method-override"),
  localStrategy = require("passport-local"),
  MongoStore = require("connect-mongodb-session")(session),
  flash = require("connect-flash"),
  User = require("./models/user"),
  Activity = require("./models/activity"),
  Note = require('./models/notes'),
  Issue = require('./models/courseissue'),
  Course = require('./models/course'),
  userRoutes = require("./routes/users"),
  //adminRoutes = require("./routes/admin"),
  courseRoutes = require("./routes/courses"),
  authRoutes = require("./routes/auth");
 // mongoString = "mongodb+srv://ranjani:<anandita>@hostman.npiob.mongodb.net/<bookstore>?retryWrites=true&w=majority";
// Seed = require('./seed');

// uncomment below line for first time to seed database;
//Seed(1000);

// if (process.env.NODE_ENV !== "production") 


// app config
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();



app.get('/user/1/notes-new', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('user/noteslanding', { notes: notes });
});


// db config
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

//PASSPORT CONFIGURATION

const store = new MongoStore({
  uri: process.env.MONGODB_URI,
  collection: "faculty",
});


app.use(
  session({
    //must be declared before passport session and initialize method
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store,
  })
);

app.use(flash());

app.use(passport.initialize()); //must declared before passport.session()
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// configure image file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: filefilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.warning = req.flash("warning");
  next();
});
app.post('/courses/:course_id/issue/:user_id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.course_id);
    const user = await User.findById(req.params.user_id);

    // registering issue
    const issue =  new Issue({
        course_info: {
            id: course._id,
            name: course.name,
            mentor: course.mentor,
            type: course.type,
            code: course.code,
            domain: course.domain,
            period: course.period,
        },
        user_id: {
            id: user._id,
            username: user.username,
        }
    });

    // putting issue record on individual user document
    user.courseIssueInfo.push(course._id);

    // logging the activity
    const activity = new Activity({
        info: {
            id: course._id,
            name: course.name,
        },
        category: "Issue",
        time: {
            id: issue._id,
            issueDate: issue.issueDate,
        },
        user_id: {
            id: user._id,
            username: user.username,
        }
    });

    // await ensure to synchronously save all database alteration
    await issue.save();
    await user.save();
    await course.save();
    await activity.save();
} catch(err) {
    console.log(err);
    return res.redirect("back");
}
const activities = await Activity.find().sort('-entryTime');
  res.render('user/notif', { activities: activities });
});

//Routes
app.use(userRoutes);
//app.use(adminRoutes);
app.use(courseRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 2500;

module.exports = app.listen(PORT, () => {
  console.log(`server is running`);
});