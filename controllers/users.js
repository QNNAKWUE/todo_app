const express = require("express");
const Joi = require("joi");
const {User, validateUser, User} = require("../models/users");

exports.createUser = (async(req, res) =>{
    const error = validateUser;
    if(error) {
       return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.emai});
    if(user) {
       return res.status(400).send("The user with the given email is already registered");
    }

    user = new User({
        name: req.body.name,
        email: req.body.emai,
        password: req.body.password
    });

    user = await user.save();
    res.send(user);

});

exports.