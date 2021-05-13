// importing dependencies
const uid = require('uid');
const fs = require('fs');

// importing models
const User = require("../models/user"),
      Activity = require("../models/activity"),
      Note = require("../models/notes"),
      Course = require("../models/course"),
      Class = require("../models/class"),
      Attendance = require("../models/attendance"),
      //course = require("../models/course"),
      Student = require("../models/student"),
      Issue = require("../models/courseissue");
const { name } = require('faker');
      //Comment = require("../models/comment");

// importing utilities
//const deleteImage = require('../utils/delete_image');

// GLOBAL_VARIABLES
const PER_PAGE = 5;

//user -> dashboard
exports.getUserDashboard = async(req, res, next) => {
    
     res.render("user/index");
    
}

// user -> profile
exports.getUserProfile = (req, res, next) => {
    res.render("user/profile");
}
exports.gettodo = (req, res, next) => {
    res.render("user/todo");
}

exports.getQuizindex = (req, res, next) => {
    res.render("user/quiz");
}
exports.getAddNewCourse= (req, res, next) => {
    res.render("user/addcourse");
}
exports.getAddNewClass= async(req, res, next) => {
    const courses = await Course.find();
  res.render('user/addclass', { courses:courses });
}
exports.getAddstudents= async(req, res, next) => {
    const classes = await Class.find();
    res.render("user/addstudent",{ classes:classes});
}
exports.postAddstudents= async(req, res, next) => {
    const user = await User.findById(req.params.user_id);
    const cl = await Class.findById(req.params.class_id);
    //const stu = req.body.student;
    const student =  new Student({
        //name: stu.name,
        //mentor: stu.mentor,
        //batch: stu.batch,
               
        user_id: {
            id: user._id,
            faculty: user.username,
        }
    });
    console.log(student.classInfo);
    console.log(student);
    student.classInfo.push(cl._id);
    student.courseInfo.push(cl.course_info.id);
    
   
    await student.save();
    res.redirect("/students/add/"+student._id+"/"+cl._id);


};

exports.postattendance= async(req, res, next) =>{
    const cl = await Class.findById(req.params.class_id);
    const students = await Student.find();
    res.render("user/attendance",{ id:cl, students:students ,classes:cl.studentInfo  });

};


exports.getpresent = async(req, res, next) =>{
    const cl = await Class.findById(req.params.class_id);
    const s = await Student.findById(req.params.student_id);
    //const student = await Student.findById(req.params.student_id);
    const att =  new Attendance({        
        });
        console.log(att.studentInfo);

    console.log(s);
    att.studentInfo.push({
        id: s._id,
        name:s.name,
        mentor: s.mentor,
        batch: s.batch,
        status: "Present",
        class: cl._id,
    });
    console.log(att.studentInfo);

    await att.save();
    res.redirect("/user/1");

};

exports.getabsent = async(req, res, next) =>{
    const cl = await Class.findById(req.params.class_id);
    const student = await Student.findById(req.params.student_id);
    const att =  new Attendance({        
        });
        console.log(att.studentInfo);

    
    att.studentInfo.push({
        id: student._id,
        name:student.name,
        mentor: student.mentor,
        batch: student.batch,
        status: "Absent",
        class: cl._id,
    });
    console.log(att.studentInfo);

    await att.save();
    res.redirect("/user/1");

};

exports.getattendance = async(req, res, next) =>{
    const cl = await Class.findById(req.params.class_id);
    //const stu = await Student.findById(req.params.student_id);
    const classes = await Class.findById(req.params.class_id);
    res.render("user/attendance",{ id:cl , classes:classes.studentInfo });

};

exports.getstudform= async(req, res, next) => {
    const stud = await Student.findById(req.params.student_id);
    const cl = await Class.findById(req.params.class_id);
    res.render("user/addstudent",{ id:stud, cid:cl });

};
exports.poststudform= async(req, res, next) => {
    const stud = await Student.findById(req.params.student_id);
    const cl = await Class.findById(req.params.class_id);
    const st_info = req.body.student;
    stud.name = st_info.name;
    stud.mentor = st_info.mentor;
    stud.batch = st_info.batch;
    cl.studentInfo.push({
        id: stud._id,
        name: stud.name,
        mentor: stud.mentor,
        batch: stud.batch,
    });
    await cl.save();
    await stud.save();
    res.redirect("/user/1");

};
exports.postAddNewClass= async(req, res, next) => {
    try {
        const user = await User.findById(req.params.user_id);
        const class_info = req.body.class;
        console.log(class_info);
        var name =  class_info.name;
        var id =  class_info.code;
        const course = await Course.findById(id);
        //const user = await User.findById(currentUser._id);

        // registering issue
        const cl =  new Class({
            name : name,
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

        // logging the activity
        const activity = new Activity({
            info: {
                id: cl._id,
                name: course.name,
            },
            category: "Class",
            user_id: {
                id: user._id,
                username: user.username,
            }
        });

        // await ensure to synchronously save all database alteration
        await cl.save();
        await activity.save();

        res.render("user/course");
    } catch(err) {
        console.log(err);
        return res.redirect("back");
    }
}

exports.postAddNewCourse = async(req, res, next) => {
    try {
        const course_info = req.body.course;
        //course_info.description = req.sanitize(course_info.description);
        
        const isDuplicate = await Course.find(course_info);

        if(isDuplicate.length > 0) {
            req.flash("error", "This course is already registered in inventory");
            return res.redirect('back');
        } 

        const new_course = new Course(course_info);
        await new_course.save();
        req.flash("success", `A new course named ${new_course.title} is added to the inventory`);
        res.redirect("/user/1/courseInventory/all/all/1");
    } catch(err) {
        console.log(err);
        res.redirect('back');
    }
};
exports.postIssueCourse = async(req, res, next) => {
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

        res.render("user/notif");
    } catch(err) {
        console.log(err);
        return res.redirect("back");
    }
}
exports.getUserCourseInventory = async(req, res, next) => {
    try{
        let page = req.params.page || 1;
        const filter = req.params.filter;
        const value = req.params.value;

        // console.log(filter, value);
        // // constructing search object
        let searchObj = {};
        if(filter !== 'all' && value !== 'all') {
            // fetch courses by search value and filter
            searchObj[filter] = value;
         }

        // get the course counts
        const courses_count = await Course.find(searchObj).countDocuments();

        // fetching courses
        const courses = await Course
            .find(searchObj)
            .skip((PER_PAGE * page) - PER_PAGE)
            .limit(PER_PAGE)
        
        // rendering admin/courseInventory
        res.render("user/courseInventory", {
            courses : courses,
            current : page,
            pages: Math.ceil(courses_count / PER_PAGE),
            filter : filter,
            value : value,
        });
    } catch(err) {
        // console.log(err.messge);
        return res.redirect('back');
    }
}

// admin -> return course inventory by search query working procedure
/*
    same as getAdmincourseInventory method
*/
exports.postUserCourseInventory = async(req, res, next) => {
    try {
        let page = req.params.page || 1;
        const filter = req.body.filter.toLowerCase();
        const value = req.body.searchName;

        if(value == "") {
            req.flash("error", "Search field is empty. Please fill the search field in order to get a result");
            return res.redirect('back');
        }
        const searchObj = {};
        searchObj[filter] = value;

        // get the courses count
        const courses_count = await Course.find(searchObj).countDocuments();

        // fetch the courses by search query
        const courses = await Course
            .find(searchObj)
            .skip((PER_PAGE * page) - PER_PAGE)
            .limit(PER_PAGE);
        
        // rendering admin/courseInventory
        res.render("user/courseInventory", {
            courses: courses,
            current: page,
            pages: Math.ceil(courses_count / PER_PAGE),
            filter: filter,
            value: value,
        });

    } catch(err) {
        // console.log(err.message);
        return res.redirect('back');
    }
}

exports.getUpdateCourse = async (req, res, next) => {

    try {
        const course_id = req.params.course_id;
        const course = await Course.findById(course_id);

        res.render('user/updatecourse', {
            course: course,
        })
    } catch(err) {
        console.log(err);
        return res.redirect('back');
    }
};

// admin -> post update course
exports.postUpdateCourse = async(req, res, next) => {

    try {
        //const description = req.sanitize(req.body.course.description);
        const course_info = req.body.course;
        const course_id = req.params.course_id;

        await Course.findByIdAndUpdate(course_id, course_info);

        res.redirect("/user/1/courseInventory/all/all/1");
    } catch (err) {
        console.log(err);
        res.redirect('back');
    }
};

// admin -> delete course
exports.getDeleteCourse = async(req, res, next) => {
    try {
        const course_id = req.params.course_id;

        const course = await Course.findById(course_id);
        await course.remove();

        req.flash("success", `A course named ${course.name} is just deleted!`);
        res.redirect('back');

    } catch(err) {
        console.log(err);
        res.redirect('back');
    }
};






exports.getcal = (req, res, next) => {
    res.render("user/calender");
}
exports.notespage = (req, res, next) => {
    res.render("user/noteslanding");
}
exports.newnotepage =(req, res, next) => {
    res.render("user/notes");
}
exports.postnotes = async(req, res, next) => {
    let note = await new Note({
        title: req.body.title,
        description: req.body.description,
      });
      try {
        note = await note.save();
        res.redirect('/user/1/notes-new');
      } catch (e) {
        console.log(e);
        res.render('user/noteslanding');
      }
    };


exports.deletenote = async(req, res, next) => {
    try {
        await Note.findByIdAndRemove(req.params.id);
        res.redirect('/user/1/notes-new');
      } catch (e) {
        console.log(e);
        res.redirect('/user/1/notes-new');
      }
};

// user -> update/change password
exports.putUpdatePassword = async(req, res, next) => {
    const username = req.user.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.password;

    try {
        const user = await User.findByUsername(username);
        await user.changePassword(oldPassword, newPassword);
        await user.save();

        // logging activity
        const activity = new Activity({
            category: "Update Password",
            user_id : {
                id : req.user._id,
                username : req.user.username,
            },
        });
        await activity.save();

        req.flash("success", "Your password is recently updated. Please log in again to confirm");
        res.redirect("/auth/user-login");
    } catch(err) {
        console.log(err);
        return res.redirect('back');
    }
}

// user -> update profile
exports.putUpdateUserProfile = async(req, res, next) => {
    try{
        const userUpdateInfo = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "gender": req.body.gender,
            "address": req.body.address,
        }
        await User.findByIdAndUpdate(req.user._id, userUpdateInfo);

        // logging activity
        const activity = new Activity({
            category: "Update Profile",
            user_id: {
                id: req.user._id,
                username: req.user.username,
            }
        });
        await activity.save();

        res.redirect('back');
    } catch(err) {
        console.log(err);
        return res.redirect('back');
    }
}

// upload image
exports.postUploadUserImage = async (req, res, next) => {
    try {
        const user_id = req.user._id;
        const user = await User.findById(user_id);

        let imageUrl;
        if(req.file) {
            imageUrl = `${uid()}__${req.file.originalname}`;
            let filename = `images/${imageUrl}`;
            let previousImagePath = `images/${user.image}`;

            const imageExist = fs.existsSync(previousImagePath);
            if(imageExist) {
                deleteImage(previousImagePath);
            }
            await sharp(req.file.path)
                .rotate()
                .resize(500, 500)
                .toFile(filename);
            
            fs.unlink(req.file.path, (err) => {
                if(err) {
                    console.log(err);
                }
            })
        } else {
            imageUrl = 'profile.png';
        }
        
        user.image = imageUrl;
        await user.save();
        
        const activity = new Activity({
            category : "Upload Photo",
            user_id : {
              id : req.user._id,
              username: user.username,
             }
        });
        await activity.save();
        
        res.redirect("/user/1/profile");
    } catch(err) {
        console.log(err);
        res.redirect('back');
    }
};

//user -> notification
exports.getNotification = async(req, res, next) => {
    res.render("user/notification");
}
exports.coursespage = async(req, res, next) => {
    res.render("user/course");
}
//user -> issue a course
/*
exports.postIssuecourse = async(req, res, next) => {
    if(req.user.violationFlag) {
        req.flash("error", "You are flagged for violating rules/delay on returning courses/paying fines. Untill the flag is lifted, You can't issue any courses");
        return res.redirect("back");
    }

    if(req.user.courseIssueInfo.length >= 5) {
        req.flash("warning", "You can't issue more than 5 courses at a time");
        return res.redirect("back");
    }

    try {
        const course = await course.findById(req.params.course_id);
        const user = await User.findById(req.params.user_id);

        // registering issue
        course.stock -= 1;
        const issue =  new Issue({
            course_info: {
                id: course._id,
                title: course.title,
                author: course.author,
                ISBN: course.ISBN,
                category: course.category,
                stock: course.stock,
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
                title: course.title,
            },
            category: "Issue",
            time: {
                id: issue._id,
                issueDate: issue.course_info.issueDate,
                returnDate: issue.course_info.returnDate,
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

        res.redirect("/courses/all/all/1");
    } catch(err) {
        console.log(err);
        return res.redirect("back");
    }
}
*/
// user -> show return-renew page
exports.getShowRenewReturn = async(req, res, next) => {
    const user_id = req.user._id;
    try {
        const issue = await Issue.find({"user_id.id": user_id});
        res.render("user/return-renew", {user: issue});
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

// user -> renew course working procedure
/*
    1. construct the search object
    2. fetch issues based on search object
    3. increament return date by 7 days set isRenewed = true
    4. Log the activity
    5. save all db alteration
    6. redirect to /courses/return-renew
*/
exports.postRenewcourse = async(req, res, next) => {
    try {
        const searchObj = {
            "user_id.id": req.user._id,
            "course_info.id": req.params.course_id,
        }
        const issue = await Issue.findOne(searchObj);
        // adding extra 7 days to that issue
        let time = issue.course_info.returnDate.getTime();
        issue.course_info.returnDate = time + 7*24*60*60*1000;
        issue.course_info.isRenewed = true;

        // logging the activity
        const activity = new Activity({
            info: {
                id: issue._id,
                title: issue.course_info.title,
            },
            category: "Renew",
            time: {
                id: issue._id,
                issueDate: issue.course_info.issueDate,
                returnDate: issue.course_info.returnDate,
            },
            user_id: {
                id: req.user._id,
                username: req.user.username,
            }
        });

        await activity.save();
        await issue.save();

        res.redirect("/courses/return-renew");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
        
    }
}

// user -> return course working procedure
/*
    1. Find the position of the course to be returned from user.courseIssueInfo
    2. Fetch the course from db and increament its stock by 1
    3. Remove issue record from db
    4. Pop courseIssueInfo from user by position
    5. Log the activity
    6. refirect to /courses/return-renew
*/
exports.postReturncourse = async(req, res, next) => {
    try {
        // finding the position
        const course_id = req.params.course_id;
        const pos = req.user.courseIssueInfo.indexOf(req.params.course_id);
        
        // fetching course from db and increament
        const course = await course.findById(course_id);
        course.stock += 1;
        await course.save();

        // removing issue 
        const issue =  await Issue.findOne({"user_id.id": req.user._id});
        await issue.remove();

        // popping course issue info from user
        req.user.courseIssueInfo.splice(pos, 1);
        await req.user.save();

        // logging the activity
        const activity = new Activity({
            info: {
                id: issue.course_info.id,
                title: issue.course_info.title,
            },
            category: "Return",
            time: {
                id: issue._id,
                issueDate: issue.course_info.issueDate,
                returnDate: issue.course_info.returnDate,
            },
            user_id: {
                id: req.user._id,
                username: req.user.username,
            }
        });
        await activity.save();

        // redirecting
        res.redirect("/courses/return-renew");
    } catch(err) {
        console.log(err);
        return res.redirect("back");
    }
}

// user -> create new comment working procedure
/* 
    1. Find the course to be commented by id
    2. Create new Comment instance and fill information inside it
    3. Log the activity
    4. Redirect to /courses/details/:course_id
*/
exports.postNewComment = async(req, res, next) => {
    try {
        const comment_text = req.body.comment;
        const user_id = req.user._id;
        const username = req.user.username;

        // fetching the course to be commented by id
        const course_id = req.params.course_id;
        const course = await course.findById(course_id);

        // creating new comment instance
        const comment = new Comment({
            text: comment_text,
            author: {
                id: user_id,
                username: username,
            },
            course: {
                id: course._id,
                title: course.title,
            }
        });
        await comment.save();
        
        // pushing the comment id to course
        course.comments.push(comment._id);
        await course.save();

        // logging the activity
        const activity = new Activity({
            info: {
                id: course._id,
                title: course.title,
            },
            category: "Comment",
            user_id: {
                id: user_id,
                username: username,
            }
        });
        await activity.save();

        res.redirect("/courses/details/"+course_id);
    } catch (err) {
        console.log(err);
        return res.redirect("back");
        
    }
}

// user -> update existing comment working procedure
/*
    1. Fetch the comment to be updated from db and update
    2. Fetch the course to be commented for logging course id, title in activity
    3. Log the activity
    4. Redirect to /courses/details/"+course_id
*/
exports.postUpdateComment = async(req, res, next) => {
    const comment_id = req.params.comment_id;
    const comment_text = req.body.comment;
    const course_id = req.params.course_id;
    const username = req.user.username;
    const user_id = req.user._id;

    try {
        // fetching the comment by id
        await Comment.findByIdAndUpdate(comment_id, comment_text);

        // fetching the course
        const course = await course.findById(course_id);

        // logging the activity
        const activity = new Activity({
            info: {
                id: course._id,
                title: course.title,
             },
             category: "Update Comment",
             user_id: {
                id: user_id,
                username: username,
             }
        });
        await activity.save();

        // redirecting
        res.redirect("/courses/details/"+course_id);
        
    } catch(err) {
        console.log(err);
        return res.redirect("back");
    }

}

// user -> delete existing comment working procedure
/* 
    1. Fetch the course info for logging info
    2. Find the position of comment id in course.comments array in course model
    3. Pop the comment id by position from course
    4. Find the comment and remove it from Comment
    5. Log the activity
    6. Redirect to /courses/details/" + course_id
*/
exports.deleteComment = async(req, res, next) => {
    const course_id = req.params.course_id;
    const comment_id = req.params.comment_id;
    const user_id = req.user._id;
    const username = req.user.username;
    try {
        // fetching the course
        const course = await course.findById(course_id);

        // finding the position and popping comment_id
        const pos = course.comments.indexOf(comment_id);
        course.comments.splice(pos, 1);
        await course.save();

        // removing comment from Comment
        await Comment.findByIdAndRemove(comment_id);

        // logging the activity
        const activity = new Activity({
            info: {
                id: course._id,
                title: course.title,
             },
            category: "Delete Comment",
            user_id: {
                id: user_id,
                username: username,
             }
        });
        await activity.save();

        // redirecting
        res.redirect("/courses/details/" + course_id);
    } catch(err) {
        console.log(err);
        return res.redirect("back");
    }
}

// user -> delete user account
exports.deleteUserAccount = async (req, res, next) => {
    try {
        const user_id = req.user._id;

        const user = await User.findById(user_id);
        await user.remove();

        let imagePath = `images/${user.image}`;
        if(fs.existsSync(imagePath)) {
            deleteImage(imagePath);
        }

        await Issue.deleteMany({"user_id.id": user_id});
        await Comment.deleteMany({"author.id":user_id});
        await Activity.deleteMany({"user_id.id": user_id});

        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect('back');
    }
}

