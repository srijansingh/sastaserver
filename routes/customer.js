const express = require('express');
const {body} = require('express-validator');

const {signup, login,fetchCategory} = require('../controller/customer');

const Customer = require('../models/customer');
const router = express.Router();

router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {req}) => {
        return Customer.findOne({email: value})
        .then(userDoc => {
            if(userDoc) {
                return Promise.reject('E-mail already exist');
            }
        })
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('name').trim().not().isEmpty()
], signup);


router.post('/login', login);

// Fetch active category
router.get('/category', fetchCategory);


module.exports = router; 