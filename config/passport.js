const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const db = require('./database');

const verifyCallback = (username, password, done) => {
    db.query('SELECT * FROM users WHERE email = ?', [username], (err, data, fields) => {
        if (err) {
            return done(err);
        }
        if (data.lenght == 0) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        const isValid = validPassword(password, data[0].hash, data[0].salt);

        user = { id: data[0].id, username: data[0].username, hash: data[0].hash, salt: data[0].salt }

        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}

const strategy = new LocalStrategy({usernameField: 'email'}, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, data) => {
        done(null, data[0])
    });
});

genPassword = (password) => {
    const salt = crypto
        .randomBytes(32)
        .toString('hex');
    const genhash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return {
        salt: salt,
        hash: genhash
    };
}

validPassword = (password, hash, salt) => {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return hash === hashVerify;
}

isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/');
    }
}

isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin == 1) {
        next();
    } else {
        res.redirect('/');
    }
}

userExists = (req, res, next) => {
    db.query('SELECT * FROM users WHERE username = ?', [req.body.username], (err, data, fields) => {
        if (err) {
            console.log(err);
        } else if (data.length > 0) {
            res.redirect('/')
        } else {
            next();
        }
    });
}

module.exports = { passport, isAuth, isAdmin, userExists };