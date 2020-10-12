const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderCarrito, carritoAddProducto, comprarCarrito } = require('../controllers/carrito.controller')

router.use(isLoggedIn);

router.get('/', isLoggedIn,renderCarrito);
router.post('/add/:id', isLoggedIn, carritoAddProducto);
router.get('/comprar', isLoggedIn, comprarCarrito);

module.exports = router;
