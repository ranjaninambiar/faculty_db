const Project = require('../models/project');
const PER_PAGE = 16;



exports.getProject = async(req, res, next) => {
    var page = req.params.page || 1;
    const filter = req.params.filter;
    const value = req.params.value;
    let searchObj = {};
 
    // constructing search object
    if(filter != 'all' && value != 'all') {
       // fetch project by search value and filter
       searchObj[filter] = value;
    }

    try {
       // Fetch project from database
       const project = await Project
       .find(searchObj)
       .skip((PER_PAGE * page) - PER_PAGE)
       .limit(PER_PAGE);//NOSONAR

       // Get the count of total available project of given filter
       const count = await Project.find(searchObj).countDocuments();//NOSONAR
 
       res.render("project", {
          project: project,
          current: page,
          pages: Math.ceil(count / PER_PAGE),
          filter: filter,
          value: value,
         
       })
    } catch(err) {
       console.log(err)
    }
}

exports.findProject = async(req, res, next) => {
   
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
      const project = await Project
      .find(searchObj)
      .skip((PER_PAGE * page) - PER_PAGE)
      .limit(PER_PAGE);//NOSONAR

      // Get the count of total available book of given filter
      const count = await Project.find(searchObj).countDocuments();//NOSONAR

      res.render("project", {
         project: project,
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


exports.getProjectDetails = async(req, res, next) => {
   try {
      const project_id = req.params.project_id;
      const project = await Project.findById(project_id);//NOSONAR
      res.render("user/projectDetails", {project: project});
   } catch (err) {
      console.log(err);
      return res.redirect("back");
   }
}