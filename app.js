/**
 * App.js
 * 
 * REST API with Express.js
 * 
 * Author: James Stomberg
 * Email: jast2202@student.miun.se
 */

/* -------------------------------------------------------------------------- */
/*                                App setup                                   */
/* -------------------------------------------------------------------------- */

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Set dev mode true / false.
const dev = false;

/* -------------------------------------------------------------------------- */
/*                                App models                                  */
/* -------------------------------------------------------------------------- */

const Post = require('./models/post');

/* -------------------------------------------------------------------------- */
/*                                App DB connection                           */
/* -------------------------------------------------------------------------- */

const dbUri = 'mongodb+srv://admin-james:QQZOMEfLKbSZKdV7@cluster0.vhab7.mongodb.net/?retryWrites=true&w=majority';

if (dev === true) {
    const dbUri = 'mongodb://localhost:27017/proj-restapi';
}

// Local DB / mLab.
if (dbUri) {
    mongoose.connect(dbUri)
    .then(() => {
        console.log('Succesfully connected to the database.');
    })
    .catch(err => {
        console.log('Connection to database failed.');
        console.error(err);
    })
}

/* -------------------------------------------------------------------------- */
/*                                App tools                                   */
/* -------------------------------------------------------------------------- */

//app.use(express.static(__dirname + '/public')); --eventually us for uploaded images??
app.use(cors());
app.use(bodyParser.json());

/* -------------------------------------------------------------------------- */
/*                                API routes                                  */
/* -------------------------------------------------------------------------- */

// Get all posts.
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find({});

    // Pagination. Inspiration from: https://stackoverflow.com/questions/47800245/node-pagination-with-express
    const perPage = 2;
    const pageCount = Math.ceil(posts.length / perPage);
    let page = parseInt(req.query.page);

    if (!page) { 
        page = 1;
    }

    if (page > pageCount) {
      page = pageCount;
    }

    res.json({
      "page": page,
      "pageCount": pageCount,
      "posts": posts.slice(page * perPage - perPage, page * perPage)
    });
});

// Get a single post.
app.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        res.json(post);
    } catch (err) {
        res.send('Invalid ID.');
    }
});

// Add a new post.
app.post('/api/posts', async (req, res) => {
    const data = req.body;

    try {
        const addedPost = await Post.create(
            {
                postTitle: data.postTitle,
                postContent: data.postContent,
                postAuthor: data.postAuthor,
                postImage: data.postImage
            }
        );

        if (!addedPost) {
            res.status(404).send('Post could not be added.');
            return;
        }

        res.status(200).send('Succesfully added post.');
    } catch (err) {
        res.status(500).send('Something went wrong. Could not add post.');
    }
});

// Update a post by id.
app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            { _id: id },
            {
                postTitle: data.postTitle,
                postContent: data.postContent,
                postAuthor: data.postAuthor,
                postImage: data.postImage
            }
        );

        if (!updatedPost) {
            res.status(404).send('ID does not exist.');
            return;
        }

        res.status(200).send('Succesfully updated post.');
    } catch (err) {
        res.status(500).send('Something went wrong. Could not update post.');
    }
});

// Delete a post by id.
app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            res.status(404).send('ID does not exist.');
            return;
        }

        res.status(200).send('Succesfully deleted post.');
    } catch (err) {
        res.status(500).send('Something went wrong. Could not delete post.');
    }
});

/* -------------------------------------------------------------------------- */
/*                                App port                                    */
/* -------------------------------------------------------------------------- */

app.listen(3001, () => {
    console.log('Server is running on port 3001.');
});