const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

exports.create_user_post = [
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(req.body);
    } else {
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          return next(err);
        } else if (user && user.username) {
          res.json('User already exists.');
        } else {
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              next(err);
            }
        
            const user = new User({
              username: req.body.username,
              password: hashedPassword
            })
            
            user.save((err, user) => {
              if (err) {
                return next(err);
              }
              res.json(user);
            });
          });
        }
      });
    }
  }
]

exports.login_user_post = [
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(req.body);
    } else {
      passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).send('Bad request');
        }
    
        req.login(user, { session: false }, err => {
          if (err) {
            return next(err);
          }
          
          const token = jwt.sign(user.toJSON(), 'dis_a_secret', { expiresIn: '1 hr' });
          return res.json({ user, token });
        });
      })(req, res);
    }
  }
]