const express = require('express');
const router = express.Router();

const { isLoggedIn }  = require('../lib/auth');

const { renderAddProducto, addProducto, renderProductos, deleteProducto, editProducto, renderEditProducto, renderTienda, renderTiendaProducto} = require('../controllers/productos.controller');

// AUTORIZATION
router.use(isLoggedIn);

// Router
router.get('/add', renderAddProducto);
router.post('/add', addProducto);
router.get('/', isLoggedIn, renderProductos);
router.get('/delete/:id', deleteProducto);
router.get('/edit/:id', renderEditProducto);
router.post('/edit/:id', editProducto);
router.get('/tienda', renderTienda);
router.get('/tienda/:id', renderTiendaProducto);

module.exports = router;