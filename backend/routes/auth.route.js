import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { handleGoogleOAuthUser, updateCheckoutDetails, getAllUsers } from "../controllers/auth.controller.js"; // Import the controller
import User from "../models/user.model.js";

const router = express.Router();

// Google OAuth2 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9999/auth/callback", // Callback route
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Delegate user handling to the controller
        const user = await handleGoogleOAuthUser(profile);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes for Google OAuth2 login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user; // Ensure user is available
    if (user) {
      // Redirect with user data in query string
      res.redirect(`http://localhost:5174/?user=${encodeURIComponent(JSON.stringify(user))}`);
    } else {
      // Handle case when user is not available
      res.redirect("http://localhost:5174/");
    }
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.redirect("http://localhost:5174/");
  });
});

router.put("/checkout/save-details/:userId", updateCheckoutDetails);

// Route to get all users
router.get('/users', getAllUsers);


export default router;
