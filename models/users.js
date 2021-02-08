const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Name should not be less than 3 characters"],
        maxlength: 25,
        required: [true, "name is required"],
    },

    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
    },

    password: {
        type: String,
        required: true,
        minlength: [6, "Password should contain at least 6 characters"],
        maxlength: 250,
    },

});

const User = new mongoose.model("User", userSchema);
const user = new User({});

function validateUser(user){
    const schema = {
        name = Joi.string().required().min(3).max(25),
        email: Joi.string().required().unique(),
        password: Joi.string().required().min(6)
    }
} 


module.exports.User = User;
module.exports.validateUser = validateUser;