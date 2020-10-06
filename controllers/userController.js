const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 60 * 60 * 24 * 7;
const createToken = (id) => {
  return jwt.sign({ id }, "mySecret", { expiresIn: maxAge });
};

const login_get = (req, res) => {
  res.render("auth/login", { title: "Login" });
};
const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("auth", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};
const signup_get = (req, res) => {
  res.render("auth/signup", { title: "Sign up" });
};
const signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user._id);
    res.cookie("auth", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(201).json({ user });
  } catch (error) {
    res.json(error);
  }
};

const logout = (req, res) => {
  res.cookie("auth", "", { httpOnly: true, maxAge: 1 });
  res.redirect("/login");
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
  logout,
};
