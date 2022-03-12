const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const mainRouter = require('./routes/main');
const indexRouter = require('./routes/index');

const app = express();

const mongodb = process.env.MONGODB;
mongoose.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));

app.use('/', mainRouter);
app.use('/api', indexRouter);

app.listen(process.env.PORT, () => console.log('App listening on port ' + process.env.PORT));