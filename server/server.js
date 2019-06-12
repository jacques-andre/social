const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const PORT = process.env.PORT || 5000;
const mongodb = require("mongodb");

// Connect to db
const db = require("../config/keys").MongoUri;
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to Mongo!"))
  .catch(err => console.log(err));

// Connect to passport
require("../config/passport")(passport);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// BodyParser
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Cors
app.use(cors());

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Var
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// Api
const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
