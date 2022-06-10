const router = require('express').Router();
const { create, list, show, update, destroy } = require('../controllers/proyectos');
const { auth } = require('../utils/auth');

router.route('/').post(auth, create).get(list);
router.route('/:proyectoId').get(show).put(auth, update).delete(auth, destroy);

module.exports = router;
