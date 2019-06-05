export default (req, res, next) => {
  if (req.body.password !== req.body.password_confirmation) {
    return res.status(400).json({ password_confirmation: { message: 'Passwords do not match.' } });
  }
  return next();
};
