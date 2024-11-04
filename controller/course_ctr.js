const { read_file, write_file } = require("../api/api");
const { v4 } = require("uuid");

const getCourse = async(req, res, next) => {
  try {
    const courses = read_file("course.json");

    res.send(courses)
  } catch (error) {
    next(error);
  }
}

const addCourse = async (req, res, next) => {
  try {
    const courses = read_file("course.json");

    courses.push({
      id: v4(),
      ...req.body
    })
    res.send({
      message: "added date"
    });

    write_file("course.json", courses)
    res.send({
      message: "adedd data"
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCourse,
  addCourse
};
