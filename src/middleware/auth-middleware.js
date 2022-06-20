module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).send('Unauthenticated');
};

// module.exports.isAdmin = (req, res, next) => {}
