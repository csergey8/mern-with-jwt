const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const router = Router();


// /api/auth
router.post('register',
[
  check('email', 'Wrong email').isEmail(),
  check('password', 'Password is uncorrect').isLength({ min: 6})
], 
async (req, res) => {
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), message: 'Wrong data'})
    }
    const { email, password } = req.body;

    const candidate = await User.findOne({ email })
    if(candidate) {
      return res.status(400).json({ message: 'Email is already registred'})
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email, 
      password: hashedPassword
    })

    await user.save();

    res.status(201).json({ message: 'User was created'})

  } catch (e) {
    res.status(500).json({message: 'Something goes wrong'})
  }
})

router.post('login',
[
  check('email', 'Email is wrong').normalizeEmail().isEmail(),
  check('password', 'Enter your password').exists()
],
 async (req, res) => {
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), message: 'Login Error'})
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if(!user){
      return res.status(400).json({ message: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json({ message: 'Wrong password'})
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })

    


  } catch (e) {
    res.status(500).json({message: 'Something goes wrong'})
  }
})


module.exports = router