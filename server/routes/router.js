const express = require('express');
const render = require('../services/render');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/', render.users);

router.get('/add_user', render.add_user);

router.get('/update_user', render.update_user);

// API Route
router.post('/api/user', controller.user_create);
router.get('/api/user', controller.user_find);
router.put('/api/user/:id', controller.user_update);
router.delete('/api/user/:id', controller.user_delete);

module.exports = router;