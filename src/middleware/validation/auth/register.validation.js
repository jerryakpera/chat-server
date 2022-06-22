const { body } = require('express-validator');

module.exports = () => {
  return [
    body('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Enter an email for the user')
      .isEmail()
      .withMessage('Users email must be a valid email address'),
  ];
};
