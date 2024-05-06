const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Welcome to our APP! /');
});

// static files routes

module.exports = router;
