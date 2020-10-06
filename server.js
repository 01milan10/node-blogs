const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const Blog = require("./models/Blog");
const { checkUser } = require("./middleware/authMiddleware");
const fileUpload = require("express-fileupload");

//express app
const app = express();

//connect to the database
const dbURI = "mongodb://localhost:27017/nodejs-blogs";
mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    //listening to the requests to the app
    app.listen(3000);
  }
);

//middleware
app.use(morgan("dev"));
//setting the static content for the browser(static folder/public folder)
app.use(express.static("./public"));
//setting to receive the json from the frontend
app.use(express.json());
//using the cookie parser middleware
app.use(cookieParser());
//setting the view engine
app.set("view engine", "ejs");
//using the fileupload middleware to receive the files uploaded from the form
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//app routes
app.get("*", checkUser);
app.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.render("index", { blogs, title: "Basic Blogs" });
});

//blogRoutes
app.use("/blogs", blogRoutes);

//user routes
app.use(userRoutes);

//page not found
app.use((req, res) => {
  res.send("Page not found");
});
