const mysql = require('mysql');
const {promisify} = require('util');
const express = require('express');
const router = express.Router();

const { database } = require('./keys');



const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION LOST OR CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE REFUSED');
        }
        if (err.code === 'ER_DUP_ENTRY') {
            console.error('USUARIO DUPLICADO');
        }
    }

    if (connection) connection.release();
    console.log('DB CONNECTED');
    return;
});

// CONVIERTE CALLBACKS EN PROMESAS
pool.query = promisify(pool.query);

module.exports = pool;