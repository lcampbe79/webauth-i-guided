const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const bcrypt = require('bcryptjs')

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

router.post('/hash', (req, res) => {
  const password = req.body.password;

  const hash = bcrypt.hashSync(password,11)
  res.status(200).json(hash)
})

module.exports = router;
