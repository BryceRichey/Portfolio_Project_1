require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');

const recipeRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');

const db = require('./config/database');
const authConfig = require('./config/passport');
const bodyParser = require('body-parser');
const sessionStore = new MySQLStore({}, db.promise());
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(authConfig.setCurrentUser);
app.use(recipeRouter);
app.use(usersRouter);

app.get('/', (_req, res, _next) => {
    if (session.path) {
        res.redirect(session.path);
        session.path = null;
    } else {
        res.render('home')
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Project_1 listening on port ${port}`)
});

module.exports = app;