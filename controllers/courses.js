const Course = require('../models/course');
const PER_PAGE = 16;



exports.getCourses = async(req, res, next) => {
    var page = req.params.page || 1;
    const filter = req.params.filter;
    const value = req.params.value;
    let searchObj = {};
 
    // constructing search object
    if(filter != 'all' && value != 'all') {
       // fetch courses by search value and filter
       searchObj[filter] = value;
    }

    try {
       // Fetch courses from database
       const courses = await Course
       .find(searchObj)
       .skip((PER_PAGE * page) - PER_PAGE)
       .limit(PER_PAGE);

       // Get the count of total available course of given filter
       const count = await Course.find(searchObj).countDocuments();
 
       res.render("courses", {
          courses: courses,
          current: page,
          pages: Math.ceil(count / PER_PAGE),
          filter: filter,
          value: value,
         
       })
    } catch(err) {
       console.log(err)
    }
}

exports.findCourses = async(req, res, next) => {
   
   var page = req.params.page || 1;
   const filter = req.body.filter.toLowerCase();
   const value = req.body.searchName;

   // show flash message if empty search field is sent to backend
   if(value == "") {
       req.flash("error", "Searc field is empty. Please fill the search field in order to get a result");
       return res.redirect('back');
   }

   const searchObj = {};
   searchObj[filter] = value;

   try {
      // Fetch books from database
      const courses = await Course
      .find(searchObj)
      .skip((PER_PAGE * page) - PER_PAGE)
      .limit(PER_PAGE)

      // Get the count of total available book of given filter
      const count = await Course.find(searchObj).countDocuments();

      res.render("courses", {
         courses: courses,
         current: page,
         pages: Math.ceil(count / PER_PAGE),
         filter: filter,
         value: value,
         user: req.user,
      })
   } catch(err) {
      console.log(err)
   }
}


exports.getCourseDetails = async(req, res, next) => {
   try {
      const course_id = req.params.course_id;
      const course = await Course.findById(course_id);
      res.render("user/courseDetails", {course: course});
   } catch (err) {
      console.log(err);
      return res.redirect("back");
   }
}