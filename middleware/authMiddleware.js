const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkUser = (req, res, next) => {
  const token = req.cookies.auth;
  if (token) {
    jwt.verify(token, "mySecret", async (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.locals.user = null;
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { checkUser };
