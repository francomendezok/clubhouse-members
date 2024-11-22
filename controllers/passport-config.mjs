import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import pool from '../db/pool.mjs'; 

// Configuración de estrategia local
passport.use(
  new LocalStrategy(
    { // my html fields from log in form // 
      usernameField: "log-email", 
      passwordField: "log-password"
    },
    async (email, password, done) => {
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = rows[0];

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);


// Serializar usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar usuario desde la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
