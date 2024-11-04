const {Router} = require("express")
const {getCourse, addCourse} = require("../controller/course_ctr")
const checkUser = require("../middleware/auth")

const courseRouter = Router()

courseRouter.post("/add_course",checkUser, (req, res, next) => {
  if(req.role === "admin") {
    addCourse(req, res, next);
  }else {
    res.status(403).send({
      message: "ruxsat yo'q: faqat admin qo'sha oladi"
    })
  }
});

courseRouter.get("/get_course", checkUser, (req, res, next) => {
  if(req.role === "user" || req.role === "admin") {
    getCourse(req, res, next);
  } else {
    res.status(403).send({
      message: "Ok"
    })
  }
});
module.exports = courseRouter