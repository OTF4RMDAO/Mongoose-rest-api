const mongoose = require("mongoose");

// create post Schema 
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String
    },
    postImg: {
        type: String,
        default: "mongodb+srv://alasman:<db_password>@cluster0.ekaur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    },
    category: String,
    tags: [String],
    likes: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    }
    
}, Timestamp = true)


module.exports = mongoose.model("Post", postSchema);