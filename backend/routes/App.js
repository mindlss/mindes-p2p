const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', function (req, res) {
    res.send('Welcome to our APP!');
});

router.get('/admin', authMiddleware.checkPermission(), function (req, res) {
    res.send('Welcome to our APP!');
});

router.get(
    '/delete',
    authMiddleware.checkPermission(),
    function (req, res) {
        res.send('Welcome to our APP!');
    }
);

module.exports = router;
