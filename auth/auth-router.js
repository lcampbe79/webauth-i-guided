const bcrypt = require('bcryptjs')

const router = require('express').Router();

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  let userInformation = req.body;

  const hashedPassword = bcrypt.hashSync(userInformation.password, 11)
  userInformation.password = hashedPassword
  Users.add(userInformation)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      //checks if PW is valid
      if (user && bcrypt.compareSync(password, user.password)) {//compares the password first then hashedPW
        
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;