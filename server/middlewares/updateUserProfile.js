export default (req, res, next) => {
    if (req.body.password && req.body.confirm) {
        if (req.body.password !== req.body.confirm) {
            return res.status(400).json({
                confirm: { message: 'Passwords do not match.' }
            });
        }
        if (!req.user.comparePassword(req.body.old_password)) {
            return res.status(400).json({
                old_password: { message: 'Wrong password!' }
            });
        }
    }

    return next();
};
