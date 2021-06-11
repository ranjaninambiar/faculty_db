const Class = require('../models/class');
const PER_PAGE = 16;



exports.getClasses = async(req, res, next) => {
    const classes = await Class.find();//NOSONAR
    try {
 
       res.render("classes", {
          classes:classes
       })
    } catch(err) {
       console.log(err)
    }
}