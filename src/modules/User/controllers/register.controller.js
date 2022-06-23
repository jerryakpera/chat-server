const userService = require('@/services')('User');
const { authUtils } = require('@/lib');

module.exports = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return next({ code: 401, message: 'Bad request' });
  }

  // Check for duplicate user
  const user = await userService.getItem({ email });

  if (user) {
    return next({ code: 401, message: 'Incorrect email or password' });
  }

  // Hash password
  const hashedPassword = await authUtils.hashPassword(password);
  await userService.create({ email, username, password: hashedPassword });

  return res.json({
    data: {},
    message: 'User created; login to continue',
  });
};
