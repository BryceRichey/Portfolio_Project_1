const express = require('express');
const mysql = require('mysql2');
const flash = require('express-flash');
const session = require('express-session');
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./database');
const recipeRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7
    }
}))
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
