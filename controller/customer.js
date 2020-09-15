const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customer = require('../models/customer');
const Product = require("../models/products");



// User Signup

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed.');
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password,12)
    .then(hashPw => {
        const user = new Customer({
            email:email,
            password:hashPw,
            name:name
        });
        return user.save();
    })
    .then(result => {
        const token = jwt.sign({
            email:result.email,
            userId:result._id.toString()
        }, 
        'supersecret', 
        {expiresIn: '1h'}
        );
        res.status(200).json({
            token:token, 
            userId:result._id.toString(), 
            email:result.email})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Customer.findOne({email:email})
    .then(user => {
        if(!user){
            const error = new Error('Email not found');
            error.statusCode = 401;
            throw error;
        }
        loadeduser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email:loadeduser.email,
            userId:loadeduser._id.toString()
        }, 
        'supersecret', 
        {expiresIn: '1h'}
        );
        res.status(200).json({token:token, userId:loadeduser._id.toString(), email:loadeduser.email})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};


exports.fetchCategory = (req, res, next) => {
    Product.find()
    .then(result => {
        console.log(result);
        res.status(200).json({
            category : result
        })
    })
    .catch(err => {
        res.status(401).json({
            message: err
        })
    })
};

