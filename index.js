const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRouter = require('./routes/users');
const auth = require('./auth');
const dotenv = require('dotenv').config();
const imageRouter = require('./routes/image_upload');
const cors = require('cors');

const app = express();
app.use(morgan('tiny'));
app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));


mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((db) => {
        console.log("Successfully connected to Mongodb server");
    }, (err) => console.log(err));

app.use('/users', userRouter);
app.use(auth.verifyUser);
app.use('/uploadImage', imageRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({message: err.message});
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost: ${process.env.PORT}`);
});
