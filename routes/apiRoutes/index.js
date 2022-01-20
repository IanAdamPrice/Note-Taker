const router = require('express').Router();
const notesRoute = require('../apiRoutes/notesRoutes');

router.use(notesRoute);

module.exports = router;