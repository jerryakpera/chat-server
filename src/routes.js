const router = require('express').Router();

router.use('/auth', require('./modules/User/auth.routes'));
router.use('/users', require('./modules/User/user.routes'));
router.use('/chat', require('./modules/Chat/chat.routes'));

module.exports = router;
