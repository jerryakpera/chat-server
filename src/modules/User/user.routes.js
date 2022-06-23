const router = require('express').Router();
const { isAuth } = require('../../middleware/auth-middleware');
const { global } = require('@/utils');
const controllers = require('./controllers');

router.get('/', isAuth, global.use(controllers.getUsers));

module.exports = router;
