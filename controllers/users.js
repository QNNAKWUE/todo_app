const express = require("express");
const {User, validateUser, User} = require("../models/users");
const bcrypt = require("bcrypt");


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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    user = await user.save();
    res.send(user);
});


exports.getAllUsers = (async(req, res) =>{
    const users = await User.find().sort("name");
    if(!users){
        return res.status(400).send("Users not found");
    }
    res.send(users);
});

exports.getUserById = (async(req, res) => {
    const user = await User.findById(req.body.id);
    if(!user){
        return res.status(400).send("The user with the given ID was not found");
    }
    res.send(user);
});

exports.updateUser = (async(req, res) =>{
    const error = validateUser;
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findByIdAndUpdate(req.body.id, {name: req.body.name}, {new: true});
    if(!user) {
        return res.status(400).send("Could not update the given user");
    }
    res.send(user);
});

exports.deleteUser = (async(req, res) =>{
    let user = req.body.user;
    user.remove((err, deleteUser) =>{
        if(err) {
            return res.json({error: `failed to delete $(user)`});
        }
        res.json({message: `$ {User} deleted succesfully`, deleteUser});
    })
})