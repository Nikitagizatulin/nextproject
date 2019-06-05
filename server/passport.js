import passport from 'passport';
import { Strategy } from 'passport-jwt';

const { User } = require('./models');

const secret = process.env.JWT_SECRET;

passport.use(
  new Strategy(
    {
      jwtFromRequest: req => req.cookies.jwt,
      secretOrKey: secret,
    },
    async (jwtPayload, done) => {
      if (Date.now()/1000 > jwtPayload.exp) {
        return done('jwt expired');
      }

      try {
        const user = await User.findById(jwtPayload._id);
        if (!user) {
          return done(new Error(), false);
        }
        return done(null, user);
      } catch (e) {
        return done(new Error(), false);
      }
    },
  ),
);
