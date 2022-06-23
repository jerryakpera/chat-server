const router = require('express').Router();
const { isAuth } = require('../../middleware/auth-middleware');
const { global } = require('@/utils');
const controllers = require('./controllers');

router.get('/chat/:chat', isAuth, global.use(controllers.getChat));

router.get('/groups', isAuth, global.use(controllers.getGroups));

router.post('/groups', isAuth, global.use(controllers.createGroupChat));

router.get('/:user', isAuth, global.use(controllers.getOrCreateChat));

router.get('/', isAuth, global.use(controllers.fetchChats));

// router.post('/group/:id', isAuth, global.use(controllers.addMember));

// router.put('/group/:id', isAuth, global.use(controllers.editGroupChat));

module.exports = router;
