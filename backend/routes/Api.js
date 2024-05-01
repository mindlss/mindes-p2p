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

module.exports = router;
