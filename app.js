require("dotenv").config();
const passport = require("./config/passport");
const cookieParser = require('cookie-parser');
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const app = express();
connectDB();


// const categorycontroller= require("./controllers/category.controller")
const productscontroller= require("./controllers/products.controller");
const otpcontroller= require("./controllers/otp.controller");

app.use(express.json());
app.use(express.static("public"))
app.set("view engine", "ejs");

app.use("/", productscontroller);
app.use("/otp", otpcontroller);
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(function(user, done) {

  done(null, user);
});


app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
     
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}),
function (req, res){
  let accessToken = req.user.accessToken;
  let user= req.user.user;
 return res.cookie('token', accessToken).render("products/cart", {user})
 
});

// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  console.log('err:', err)
  res.locals.message = err.message;
  res.status(500);
  res.render("error", {err});
});

var port = process.env.PORT || 3000;
app.set("port", port);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});