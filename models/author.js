/**
 * Author.js
 * 
 * Schema Author.
 * 
 * Author: James Stomberg
 * Email: jast2202@student.miun.se
 */
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true
    },
    authorEmail: {
        type: String,
        required: true
    }
});

module.exports = authorSchema;