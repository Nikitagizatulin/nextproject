import passport from 'passport';

export default (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            // if passport authenticate nothing to return
            res.status(403).send({
                error: 'you do not have access to this resource'
            });
        } else {
            // add to request user object
            req.user = user;
            next();
        }
    })(req, res, next);
};
