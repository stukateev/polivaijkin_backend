const router = require('express').Router();
const userRouter = require('./users');
const catalogRouter = require('./catalog');
const userCallBackRouter = require('./usersCallBack');

router.use('/users', userRouter);
router.use('/catalog', catalogRouter);
router.use('/usersCallBack', userCallBackRouter);

router.use((req, res, next) => {
  const error = new Error('Service not found');
  error.statusCode = 404;
  next(error);
});

module.exports = router;
