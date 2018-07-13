const express = require('express');
const router  = express.Router();
const Tweet = require('../models/Tweet');
const User = require('../models/User');

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    return res.redirect('/login?next=/profile')
}


/* GET home page */
router.post('/new', isLoggedIn, (req, res, next) => {
    req.body.user = req.user._id;
    Tweet.create(req.body)
    .then(tweet=>{
        return User.findByIdAndUpdate(req.user._id, {$push:{tweets:tweet._id}});
    })
    .then(user=>{
        res.redirect('/profile')
    })
    .catch(e=>next(e))
});

module.exports = router;
