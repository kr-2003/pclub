import express from "express";
import { rmSync } from "fs";
const app = express();
import mongoose from "mongoose";
import path from "path";
const __dirname = path.resolve();
import methodOverride from "method-override";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import LocalStrategy from "passport-local";
import ejsMate from "ejs-mate";
import { User } from "./models/user.js";
import { Blog } from "./models/blog.js";
import { captureRejectionSymbol } from "events";
import ExpressError from "./utils/ExpressError.js";
import Joi from "joi";


mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => {
    console.log("Mongo Connection done");
  })
  .catch((err) => {
    console.log("oh no mongo connection error!!!");
    console.log(err);
  });

const sessionConfig = {
  secret: "thisshouldbebettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
// app.set('views', './src/views');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  console.log(req.session);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (async (req, res) => {
  res.render("index.ejs")
}));

app.get("/register", ((req, res) => {
  res.render("register.ejs");
}));

app.post("/register", (async (req, res) => {
  try{
  const user = new User({
    email: req.body.email,
    username: req.body.username,
  });
  const newUser = await User.register(user, req.body.password);
  // req.login(newUser, (err) => {
  //   if (err) return next(err);
  //   req.flash("success", "Successfully signed up!!");
  //   res.redirect("/register");
  // });
  res.redirect("/login");
} catch(err){
  console.log(err);
  res.redirect("/register");
}
}));

app.get("/login", (async (req, res) => {
  res.render("login.ejs");
}));

app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (async (req, res) => {
    req.flash("success", "Welcome Back!!!");
    // const redirectUrl = req.session.returnTo || "/";
    res.redirect("/blogs");
  }
));

app.get("/hello", ( async (req, res) => {
  const currentUser = req.user;
  res.send("Hello " + currentUser.username);
}));

app.get("/logout", (async(req, res) => {
  req.logout();
  req.flash("success", "Goodbye!!");
  res.redirect("/");
}));

app.get("/blogs", (async (req, res) => {
  const blogs = await Blog.find({}).sort({ time: -1 });

  // const blogs = await Blog.find({});
  res.render("blogs.ejs", { blogs });
}));

app.get("/create", (async (req, res) => {
  res.render("create.ejs");
}));

app.post("/blogs", (async (req, res) => {
  // const result = campgroundSchema.validate(req.body);
  // const campgroundImages = req.files.map(f=>({url: f.path, filename: f.filename}));
  
  const newBlog = new Blog({
    title: req.body.title,
    description: req.body.description,
    author: req.user._id,
    time: new Date()
  });
  await newBlog.save();
  console.log(newBlog);
  req.flash("success", "Successfully made a new campground");
  res.redirect(`/blogs`);
}));

app.get("/blogs/:id/edit", (async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render("edit.ejs", { blog });
}));

app.put("/blogs/:id", (async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndUpdate(id, {
    title: req.body.title,
    description: req.body.description,
  });

  await blog.save();

  req.flash("success", "Successfully updated Campground!!");
  res.redirect(`/blogs`);
}));

app.get("/blogs/:id", (async (req, res)=>{
  const {id} = req.params;
  const blog = await Blog.findById(id);
  const Author = await User.findById(blog.author);
  res.render("showMore", {blog, Author});
}))

app.delete("/:id", (async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  req.flash("success", "Deleted a campground!!!");
  res.redirect("/blogs");
}));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!!" } = err;
  if (!err.message) err.message = "Something went wrong!!";
  res.status(statusCode).render("error", { err });
});

app.listen("3000", (req, res) => {
  console.log("Listening on port 3000!!");
});
