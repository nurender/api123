const router = require('express').Router();

const userRoutes = require('../modules/user/routes');

router.use(userRoutes);
module.exports = router;
