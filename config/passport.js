const passport = require("passport");

require("dotenv").config();
// const { uuid } = require("uuidv4");
const { v4: uuidv4 } = require('uuid');
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2550/auth/google/callback",
      userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ email: profile?._json?.email }).lean
          .exec;
        if (!user) {
          user = await User.create({
            email: profile?._json?.email,
            password: uuidv4(),
          });
        }

        return done(null, { accessToken, user });
      } catch (e) {
        console.log("e:", e);
      }
    }
  )
);

module.exports = passport;
