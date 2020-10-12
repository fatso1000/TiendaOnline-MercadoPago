const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderCarrito, carritoAddProducto, comprarCarrito } = require('../controllers/carrito.controller')

router.use(isLoggedIn);

router.get('/', renderCarrito);
router.post('/add/:id', carritoAddProducto);
router.get('/comprar', comprarCarrito);

module.exports = router;
