const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
require('./passport');

const mainRouter = require('./routes/main');
const publicRouter = require('./routes/public');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const app = express();

const mongodb = process.env.MONGODB;
mongoose.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));

app.use(passport.initialize());
app.use(express.json());

app.use('/', mainRouter);
app.use('/api/user', authRouter);
app.use('/api', publicRouter, passport.authenticate('jwt', { session: false }), userRouter);

app.listen(process.env.PORT, () => console.log('App listening on port ' + process.env.PORT));