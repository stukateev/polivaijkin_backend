const router = require('express').Router();
const userRouter = require('./users');
const catalogRouter = require('./catalog');
const userCallBackRouter = require('./usersCallBack');

router.use('/api/users', userRouter);
router.use('/api/catalog', catalogRouter);
router.use('/api/userscallback', userCallBackRouter);

router.use((req, res, next) => {
  console.log(req)
  const error = new Error('Service not found');
  error.statusCode = 404;
  next(error);
});

module.exports = router;
