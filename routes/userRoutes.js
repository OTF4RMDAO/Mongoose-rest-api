const express = require('express');     // import express.
const User = require('../models/User');
const route = express.Router()    // Route instance



// Creating new user endpoint
route.post('/new-user', async (req, res) => {
    // get the user properties value
    const { firstName, lastName, email, phoneNumber } = req.body;
    // Error handling and validation
    if (!firstName || !lastName || !email || !phoneNumber ) { 
        return res.status(400).json( { success: false, msg: "Please provide neccessary details"}) 
    }

    try {
        //create new user instance
        const newUser = new User ({ 
            firstName,
            lastName,
            email,
            phoneNumber
        });
        // store in the database collection
        const savedUser = await newUser.save();
        res.status(201).json({ success: true, data: savedUser});
    } catch (err) {
        res.status(400).json({ success: false, msg: `Failed to load`})
    }
})


// fetch all users endpoint.
route.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users})
    } catch (err) {
        res.status(400).json({ success: false, message: err})
    }
});


//Fetch single user  by ID
route.get('/user/:userID', async (req, res) => {
    const { userID } = req.params;

    //Fetch single user using ID.
    try {
        const userOne = await User.findById( userID );
        res.status(200).json({ success: true, data: userOne})
    } catch (error) {
        res.status(500).json({ success: false, error})
    }
})


//find and Update user info by ID
route.patch('/update-user/:userID', async (req, res) => {
    //find by ID.
    const { userID } = req.params;
    // extract body for destruction.
    const { firstName, lastName, email, phoneNumber } = req.body;

    try {
        //find by ID and update
        const updateUser = await User.findByIdAndUpdate(userID, {
            firstName,
            lastName,
            email,
            phoneNumber
        }, { new: true })

        if(!updateUser) {
            res.status(400).json({ success: false, msg: `No post with the ID ${userID}`})
        }
        res.status(200).json({ success: true, data: updateUser})
    } catch (error) {
        res.status(500).json({error: error})
    }
})


//find and delete user by ID
route.delete('/delete-user/:userID', async(req, res) => {
    const { userID } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete( userID );

        if (!deletedUser) {
            res.status(400).json({ success: false, msg: `No user with ID ${ userID }`})
            
        } else {
            res.status(200).json({ success: true, msg: ` ID ${ userID } has been deleted successfully`})
        }
    } catch (error) {
       res.status(500).json({ error });
    }
})
module.exports = route;