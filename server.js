// ****** server variables ****** //
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const _get = require('./routes/get');
const _post = require('./routes/post');

// ****** global variables ****** //
const port = 80;
const app = express();

// ****** initialize ****** // 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('\x1b[32m%s', '--> connected to database'))
    .catch(() => console.log('\x1b[31m%s', '--x database connect error'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use('/', _get);
app.use('/api', _post);

app.listen(port, () => console.log('\x1b[32m%s', `--> listening on ${port}`));