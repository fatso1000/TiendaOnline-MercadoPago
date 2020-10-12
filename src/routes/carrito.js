const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.post('/add/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const  { cantidad } = req.body;
    const list = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    
    const newCarrito = {
        cantidad: parseInt(cantidad), 
        producto: list[0].nombre_producto,
        user_id: req.user.id,
        producto_id: id
    };

    // COMPROBACION DE EXISTENCIA DEL PRODUCTO EN EL CARRITO
    const sql = await pool.query('SELECT * FROM carrito WHERE producto_id = ? AND user_id = ?', [newCarrito.producto_id, req.user.id]); 
    if (sql.length > 0) {
        
        const newSql = {
            producto_id: sql[0].producto_id,
            user_id: sql[0].user_id,
            cantidad: parseInt(sql[0].cantidad)
        }; 
        
        if (newSql.producto_id == id && newSql.user_id === req.user.id) {
            newSql.cantidad = newSql.cantidad + newCarrito.cantidad;
            
            await pool.query('UPDATE carrito SET cantidad = ? WHERE user_id = ? AND producto_id = ?', [newSql.cantidad, req.user.id, newSql.producto_id]);
            req.flash('success', 'Producto añadido correctamente. Cantidad: ' + newCarrito.cantidad);
            res.redirect('/carrito');
        } 

     } else {
        await pool.query('INSERT INTO carrito set ?', [newCarrito]);
        req.flash('success', 'Producto añadido correctamente.' + newCarrito.producto);
        res.redirect('/carrito');
     }

});

router.get('/', isLoggedIn, async (req, res) => {
    
    const lista = await pool.query('SELECT * FROM carrito WHERE user_id = ?', [req.user.id]);
    // LISTA CAUSA ERROR AL NO EXISTIR LISTA[0]
    const precio = await pool.query('SELECT precio FROM productos WHERE id = ?', [lista[0].producto_id]);
    console.log(precio[0]);
    price = precio[0].precio * lista[0].cantidad;
    console.log(price)
    res.render('carrito/list.hbs', { lista, price });
});

router.get('/comprar', isLoggedIn,(req, res) => {
    res.send('COMPRAR');
});


module.exports = router;