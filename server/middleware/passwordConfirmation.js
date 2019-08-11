export default (req, res, next) => {
  if (req.body.password !== req.body.confirm) {
    return res.status(422).json({ password_confirmation: { message: 'Passwords do not match.' } });
  }
  return next();
};
