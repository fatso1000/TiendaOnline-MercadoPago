const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const {database} = require('./keys');

// INICIALIZACIONES
const app = express();
require('./lib/passport');

// SETTINGS
app.set('port', process.env.PORT || 4000); // CREA LA VARIABLE PARA PUERTOS
app.set('views', path.join(__dirname, 'views')); // DONDE SE ENCUENTRA LA CARPETA VIEWS 
app.engine('.hbs', hbs({    // CONFIGURA EL MOTOR DE HANDLEBARS
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: ".hbs",
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'darlingsession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

    // Redireccionamiento 301
// app.use(function forceLiveDomain (req, res, next) {
//     var host = req.get('Host');
//     console.log(req.originalUrl)

//     if (host === 'localhost:4000') {
//         return res.redirect(301, 'https://DarlingPhotos' + req.originalUrl);
//     }
//     return next();
    
// });


// GLOBAL VARIABLES
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// RUTAS
app.use(require('./routes/index.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/user.routes'));
app.use('/productos', require('./routes/productos.routes'));
app.use('/carrito', require('./routes/carrito.routes'));


// PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

