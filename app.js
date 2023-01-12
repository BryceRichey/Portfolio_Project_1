const express = require('express');
const mysql = require('mysql2');
const flash = require('express-flash');
const session = require('express-session');
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./database');
const router = require('./routes/recipes')

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(router);

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/sign_up', (req, res) => {
    res.render('sign_up')
});

app.post('/sign_up', (req, res, next) => {
    db.query('INSERT INTO login SET ?', { f_name: req.body.f_name, l_name: req.body.l_name, email: req.body.email, p_word: req.body.p_word }, (err, result) => {
        if (err) {
            throw err;
        } else
            console.log('data inserted into database');
        res.redirect('/');
    })
});

const port = 3000;
app.listen(port, () => {
    console.log(`Project_1 listening on port ${port}`)
});

module.exports = app;
