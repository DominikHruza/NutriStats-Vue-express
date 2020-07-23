const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcypt = require('bcryptjs')
const {check, validationResult} = require('express-validator');
const config = require('config') ;
const User = require('./user-entitiy')

exports.validateSignUpBody = [
    check('username', 'Name must be minimum of 4 charachters long').isLength(4),
    check('password', 'Password should be minimum of 8 charachters long').isLength(8)
]

exports.validateLogInBody = [
    check('username', 'Enter a valid username').exists(),
    check('password', 'Enter a valid password').exists()
]

exports.userSignUp = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {username, password} = req.body;
    try {
        //check if user exists
       let user = await User.findOne({username})
       if(user){
            res.status(400).json({errors: [{msq: 'User already exists'}]});
            return
       }

       //Create user
       user = new User({
           username,
           password
       })
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);
       await user.save();

       //Generate token
       const payload = {
            id : user.id,
       }
       jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600},
       (err, token) => {
           if(err) throw err;
           res.json({token});
       })

       
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error!")
    }
    
}

exports.userLogIn = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body)
    const {username, password} = req.body;
    try {
        //check if user exists
       let user = await User.findOne({username})
       if(!user){
            res
            .status(400)
            .json({errors: [{msq: 'Invalid credentials'}]});
            return
       }

       //Check password
       const isMatch = await bcypt.compare(password, user.password);
       if(!isMatch){
            res
            .status(400)
            .json({errors: [{msq: 'Invalid credentials'}]});
            return
       }

       //Generate token
       const payload = {
            id : user.id,
       }
       jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600},
       (err, token) => {
           if(err) throw err;
           res.json({token});
       })

       
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error!")
    }
}