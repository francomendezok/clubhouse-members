import { validationResult } from 'express-validator';
import { validateLogUser } from './validation.mjs';
import passport from './passport-config.mjs';

const renderLogIn = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  const success = req.query.success === 'true';
  res.render('log-in', { success });
};

const logIn = [
    validateLogUser,
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          console.error("Error during authentication:", err);
          return next(err);
        }
        if (!user) {
          console.log("Authentication failed:", info.message);
          return res.redirect("/log-in?error=invalid_credentials");
        }
        req.logIn(user, (err) => {
          if (err) {
            console.error("Error logging in user:", err);
            return next(err);
          }
          console.log("Authentication successful for user:", user.email);
          return res.redirect("/");
        });
      })(req, res, next);
    },
  ];
  

export default { renderLogIn, logIn };
