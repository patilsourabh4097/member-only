const User = require('../models/user')

const async = require('async')
const {body,validationResult} = require('express-validator')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// Handle sign up page GET
exports.sign_up = (req, res, next) => {
    res.render('signUp', {
        user: req.user,
        authType: 'Sign up'
    })
}

//Handle sign up POST
exports.sign_up_post = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if(err){
            return next(err)
        }

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            status: 'member'
        }).save(err => {
            if(err){
                return next(err)
            }
            res.redirect('/')
        })
    })
}

//Handle log in page GET
exports.log_in = (req, res, next) => {
    res.render('logIn', {
        user: req.user,
        authType: 'Log In'
    })
}

//Handle log in page POST
exports.log_in_post = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/log-in',
        failureFlash: true
    })(req, res, next);
}

//Handle log OUT page GET
exports.log_out = (req, res, next) => {
    req.logout()
    res.redirect('/')
}