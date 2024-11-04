const jwt = require("jsonwebtoken")

const checkUser = async(req, res, next) => {
  const {token} = req.headers

  if(!token) {
    return res.status(401).send({
      mesasge: "token required"
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    if(decoded.role === "admin") {
      req.role = "admin";
      return next();
    }else if (decoded.role === "user") {
      req.role = "user"
      return next();
    }else {
      return res.status(403).send({
        messsage: "Faqat admin kurs qo'sha oladi"
      })
    }
  } catch (error) {
    return res.status(403).send({
      message: "invalid token"
    })
  }
}
module.exports = checkUser