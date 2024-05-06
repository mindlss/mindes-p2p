const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Welcome to our API! /');
});

router.get('/admin', function (req, res) {
    res.send('Welcome to our API! admin');
});

router.get('/delete', function (req, res) {
    res.send('Welcome to our API! delete');
});

// id generator for file according to session

// upload route to transmit file to client with client id

// client id generator according to session

// client download route with file id which tells sender to start sending file

module.exports = router;
