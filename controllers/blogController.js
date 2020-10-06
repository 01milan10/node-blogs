const Blog = require("../models/Blog");
const fs = require("fs");
const path = require("path");

const handleErrors = (errs) => {
  const errors = {};
  Object.values(errs.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });
  return errors;
};

const makeFilename = (image) => {
  const fileExtension = path.extname(image.name);
  return `${Date.now() + fileExtension}`;
};

const index = async (req, res) => {
  try {
    const author = req.params.author;
    const blogs = await Blog.find().where("authorId").equals(author);
    res.render("blogs/index", { title: `${author}'s blogs`, blogs });
  } catch (error) {
    console.log(error);
  }
};
const show = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.render("blogs/show", { title: blog.title, blog });
  } catch (error) {
    console.log(error);
  }
};
const create = (req, res) => {
  res.render("blogs/create", { title: "Create blog" });
};
const store = async (req, res) => {
  try {
    let imageName, sampleImage;
    if (req.files) {
      sampleImage = req.files.image;
      imageName = makeFilename(sampleImage);
    }
    req.body.image = imageName;

    const blog = await Blog.create(req.body);

    sampleImage.mv(`./public/uploads/${imageName}`);

    res.json(blog);
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors });
  }
};
const update = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body);
    res.json(blog);
  } catch (error) {}
};
const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    res.send(blog);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  index,
  show,
  create,
  store,
  update,
  destroy,
};
