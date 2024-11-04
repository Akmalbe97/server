const { read_file, write_file } = require("../api/api");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();

////////////////////////register
const register = async (req, res, next) => {
  try {
    const users = read_file("auth.json");

    const { username, email, password } = req.body;
    console.log(email);

    const foundedUser = users.find((item) => item.email === email);

    if (foundedUser) {
      return res.status(409).send({
        message: "User alredy exsists",
      });
    }

    const hash = await bcrypt.hash(password, 8);

    users.push({
      id: v4(),
      email,
      username,
      role: "user",
      password: hash,
    });

    write_file("auth.json", users);
    res.status(201).send({
      message: "user registered",
    });
  } catch (error) {
    throw next(error);
  }
};

/////////////////////////// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = read_file("auth.json");
    const foundeduser = users.find((item) => item.email === email);

    if (!foundeduser) {
      return res.send({
        message: "user bot found",
      });
    }

    const checkPassword = await bcrypt.compare(password, foundeduser.password);

    if (!checkPassword) {
      return res.send({
        message: "wrong password",
      });
    }

    if (checkPassword) {
      const token = jwt.sign(
        {
          id: foundeduser.id,
          password: foundeduser.password,
          role: foundeduser.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.send({
        massega: "Sucseess",
        token,
      });
    }
  } catch (error) {
    throw next(error);
  }
};

module.exports = {
  register,
  login,
};
