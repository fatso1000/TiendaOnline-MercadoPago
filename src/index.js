// READING ENVIROMENT VARIABLES
const dotenv = require('dotenv');
dotenv.config();

// IMPORTING THE MAIN APP
const app = require('./app');

app.listen(app.get('port'));
console.log('Server in Port: ', app.get('port'));