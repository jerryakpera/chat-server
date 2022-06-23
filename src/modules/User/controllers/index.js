module.exports = {
  register: require('./register.controller'),
  login: require('./login.controller'),
  logout: require('./logout.controller'),
  account: require('./account.controller'),
  getUsers: require('./get-users.controller'),
};
