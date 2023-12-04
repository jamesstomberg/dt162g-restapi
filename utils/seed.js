/**
 * Seed.js
 * 
 * Author: James Stomberg
 * Email: jast2202@student.miun.se
 */

const mongoose = require('mongoose');

const Post = require('../models/post');

// Connect to DB.
mongoose.connect('mongodb+srv://admin-james:QQZOMEfLKbSZKdV7@cluster0.vhab7.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Succesfully connected to the database. Seeding..');
    })
    .then(() => {
        console.log('Seeding finished.');
    })
    .catch(err => {
        console.log('Connection to database failed.');
        console.error(err);
    })

const seedPosts = [
    {
        "postTitle": "Lorem Ipsum",
        "postContent": "Integer dui lacus, aliquam ut molestie quis, lobortis a diam. Pellentesque eu fringilla ex, et egestas nisl. Nulla vel dignissim neque. Maecenas vitae ante a nisl suscipit vehicula. Fusce tempus, metus a cursus mollis, lectus urna dignissim neque, non tincidunt purus arcu sit amet urna. Integer at nisl at eros dictum sollicitudin ut non turpis. Suspendisse luctus egestas nulla, quis eleifend quam. Praesent convallis arcu sit amet purus lacinia, eu ullamcorper massa varius. Praesent varius eleifend eros non laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent quis massa erat. Donec dignissim, neque ac egestas sagittis, diam tellus varius diam, eu rutrum justo risus non diam.",
        "postAuthor": {
            "authorName": "James Stomberg",
            "authorEmail": "jast2202@student.miun.se"
        },
        "postImage": "https://miro.medium.com/v2/resize:fit:1400/1*XP-mZOrIqX7OsFInN2ngRQ.png"
    },
    {
        "postTitle": "Lorem Ipsum",
        "postContent": "Integer dui lacus, aliquam ut molestie quis, lobortis a diam. Pellentesque eu fringilla ex, et egestas nisl. Nulla vel dignissim neque. Maecenas vitae ante a nisl suscipit vehicula. Fusce tempus, metus a cursus mollis, lectus urna dignissim neque, non tincidunt purus arcu sit amet urna. Integer at nisl at eros dictum sollicitudin ut non turpis. Suspendisse luctus egestas nulla, quis eleifend quam. Praesent convallis arcu sit amet purus lacinia, eu ullamcorper massa varius. Praesent varius eleifend eros non laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent quis massa erat. Donec dignissim, neque ac egestas sagittis, diam tellus varius diam, eu rutrum justo risus non diam.",
        "postAuthor": {
            "authorName": "James Stomberg",
            "authorEmail": "jast2202@student.miun.se"
        },
        "postImage": "https://miro.medium.com/v2/resize:fit:1400/1*XP-mZOrIqX7OsFInN2ngRQ.png"
    },
];

Post.insertMany(seedPosts);