/**
 * Post.js
 * 
 * Model Post.
 * 
 * Author: James Stomberg
 * Email: jast2202@student.miun.se
 */

const mongoose = require('mongoose');

// Sub schemas.
const authorSchema = require('./author');

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    },
    postAuthor: {
        type: authorSchema,
        required: true,
    },
    postImage: {
        type: String,
        required: false
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;