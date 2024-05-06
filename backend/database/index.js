const mongoose = require('mongoose');

mongoose
    .connect(process.env.MongoURL)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));
