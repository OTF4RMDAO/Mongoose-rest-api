const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },

    lastName: {
        type: String,
        require: true
    }, 
   
    email: {
        type: String, 
        require: true
    },

    phoneNumber: {
        type: Number,
        require: true,
    }

})

module.exports = mongoose.model("User", userSchema);