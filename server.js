const express = require("express");
const {v4} = require("uuid");
const cors = require("cors");
const authRouter = require("./router/auth_router");
const courseRouter = require("./router/course_router");
require("dotenv").config()

const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  return res.json({
    message: "Serverimiz ishlayabdi o'chirilmagan (Running)"
  })
})
const PORT = process.env.PORT || 4000

///////////////////////////////////Router
app.use(authRouter)
app.use(courseRouter)


app.listen(PORT, () => {
  console.log(`server running on the ${PORT} port`);
  
})   