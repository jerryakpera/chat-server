const userService = require('@/services')('User');

module.exports = async (req, res, next) => {
  const user = await userService.getItem({ _id: req.session.passport.user });

  return res.json({
    data: { user },
    message: 'Logged in',
  });
};
