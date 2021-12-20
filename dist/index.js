const express = require("express");

require("dotenv").config();

const path = require("path");

const exphbs = require("express-handlebars");

const methodOverride = require("method-override");

const session = require("express-session");

const flash = require("connect-flash");

const passport = require("passport");

const app = express(); //trae la base de datos

const connectDB = require("./database"); //trae passport


require("./config/passport"); // settings


const port = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", exphbs({
  defaultLayout: "main",
  layoutDir: (app.get("views"), "views/layout"),
  partialsDir: (app.get("views"), "src/views/partials"),
  extname: ".hbs"
}));
app.set("view engine", ".hbs"); //midlleware

app.use(express.urlencoded({
  extended: false
}));
app.use(methodOverride("_method"));
app.use(session({
  secret: "mysecretapp",
  resave: true,
  saveUninitialized: true
})); //debe ir siempre despues de session este es el passport autenticator

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //global variables

app.use((req, res, next) => {
  //almacena mensajes flash
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg"); //variables globales para errores passport

  res.locals.error = req.flash("error");
  next();
}); //routes

app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users")); //static files

app.use(express.static("src/public")); //listen

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("listening on", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();