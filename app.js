require('dotenv').config();

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const recipeRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');

const db = require('./database');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));

const sessionStore = new MySQLStore({}, db.promise());
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true
    }
}));

app.use(recipeRouter);
app.use(usersRouter);

app.get('/', (req, res) => {
    res.render('home')
});

const port = 3000;
app.listen(port, () => {
    console.log(`Project_1 listening on port ${port}`)
});

module.exports = app;
