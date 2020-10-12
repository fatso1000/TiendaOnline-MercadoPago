const passport = require('passport');
const LocalStretegy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

// CREAR EL LOGEO EN PASSPORT
passport.use('local.signin', new LocalStretegy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
    // VALIDACION DE USUARIO LOGIN
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.username));
        } else {
            done(null, false, req.flash('message', 'Contraseña Incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'Nombre de usuario Incorrecto.'));
    }
}));

// REGISTRO DE USUARIOS
    // Comprobacion de existencia de username      
const isUsernameTaken = async (username) => {
    const query = await pool.query('SELECT username FROM users WHERE username = ?', [username]);
    var result = true;

    if (query.length === 0) {
        result = true;
        return result;
    } else {
        result = false;
        return result;
    }

}

    // CREAR EL REGISTRO EN PASSPORT
passport.use('local.signup', new LocalStretegy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const {fullname} = req.body;

    const newUser = {
        username,
        password,
        fullname
    };

    newUser.password = await helpers.encryptPassword(password);
    // Comprueba si el usuario ya existe
    if (await isUsernameTaken(newUser.username) === true) {
        const result = await pool.query('INSERT INTO users SET ?', [newUser]);
        newUser.id = result.insertId;
        return done(null, newUser);
    } else {
        return done(null, false, req.flash('message', 'Usuario ya existente.'));
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});