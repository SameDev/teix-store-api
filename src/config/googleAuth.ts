import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await UserRepository.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/users/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await UserRepository.findUserByGoogleId(profile.id);
      if (!user) {
        // Se não encontrar o usuário, cria um novo
        user = await UserRepository.createUser({
          name: profile.displayName,
          email: profile.emails && profile.emails.length ? profile.emails[0].value : "",
          provider: "google",
          googleId: profile.id,
          password: null  // Senha não é necessária para login com Google
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error, undefined);
    }
  }));
  

export default passport;
