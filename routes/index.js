var express = require('express');
var router = express.Router();

const User = require('../models/user')
const Message = require('../models/message')

const authController = require('../controllers/authController')
const messageController = require('../controllers/messageController')

function checkNotAuth(req, res, next)
{
    if(req.isAuthenticated()){
        res.redirect('/')    
    }
    return next()
    
}

router.get('/', (req, res) =>{
    Message.find().exec((err, list_msg)=>{
        if(err) {return next(err)}
        res.render("index", {
            user: req.user,
            msg_list: list_msg
        })
    })
});


router.get('/sign-up',checkNotAuth, authController.sign_up);

router.post('/sign-up', authController.sign_up_post);

router.get('/log-in', checkNotAuth, authController.log_in);

router.post('/log-in', authController.log_in_post);

router.get('/log-out', authController.log_out)

router.get('/create-message', messageController.create_message)

router.post('/create-message', messageController.create_message_post)

module.exports = router;
