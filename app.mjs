import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from './controllers/passport-config.mjs';
import { fileURLToPath } from 'url';

import indexRoute from './routes/indexRoute.mjs';
import signUpRoute from './routes/signUpRoute.mjs';
import logInRoute from './routes/logInRoute.mjs';
import joinRoute from './routes/joinRoute.mjs';
import createMessageRoute from './routes/createMessageRoute.mjs';
import deleteRoute from './routes/deleteRoute.mjs';

const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
        secret: process.env.SESSION_SECRET || "mi_secreto_seguro",
        resave: false, // dont´t save if there are no changes
        saveUninitialized: false, // don´t save empty sessions 
        cookie: {
            secure: false, // true if i use HTTPS
            maxAge: 1000 * 60 * 60, // 1 hour
        },
    })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// ALWAYS BEFORE I RENDER THE VIEWS !!!! // 
app.use((req, res, next) => {
  res.locals.user = req.user || null; // user available in all views // 
  next();
});

app.use('/', indexRoute)
app.use('/log-in', logInRoute)
app.use('/sign-up', signUpRoute)
app.use('/create-message', createMessageRoute)
app.use('/delete', deleteRoute)

app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); 
  }
  res.redirect('/log-in'); 
};

app.use('/join', ensureAuthenticated, joinRoute);
  
app.listen(3000, () => console.log("app listening on port 3000!"));
