const { hash, genSalt, compare } = require('bcrypt');

module.exports = {
  async hashPassword(password) {
    if (typeof password !== 'string' || password.trim().length === 0) {
      return false;
    }

    const salt = await genSalt(12);

    return hash(password, salt);
  },

  async comparePasswords(plainPassword, hashedPassword) {
    return compare(plainPassword, hashedPassword);
  },
};
