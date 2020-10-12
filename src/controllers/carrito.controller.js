const carritoCtrl = {};

const pool = require('../database');
const mp = require('../lib/mercadopago');

// CARRITO

const asyncFor = async (length, lista) => {
    var price = {}, array = []; price.total = 0;
    
    for (let i = 0; i < length; i++) {
        var precio = await pool.query('SELECT precio FROM productos WHERE id = ?', [lista[i].producto_id]);
        price.total = price.total + (precio[0].precio * lista[0].cantidad); 
        array.push(precio[0]); 
        price.unidad = array;
    } 

    return price;
    
}

carritoCtrl.renderCarrito = async (req, res) => {
    const lista = await pool.query('SELECT * FROM carrito WHERE user_id = ?', [req.user.id]);

    if (await (lista.length > 0)) {

        const newPrice = await asyncFor(lista.length, lista);
        const newArray = newPrice.unidad;
        const array = {newArray};
        // console.log(newArray)
        // console.log(newPrice)
        // console.log(array)

        res.render('carrito/list', { lista, newPrice, array });
    } else {
        res.render('carrito/list', { lista });
    }

};

carritoCtrl.carritoAddProducto = async (req, res) => {
    const {id} = req.params;
    const  { cantidad } = req.body;
    // Esta variable contiene una 
    const cantidadPermitida = (cantidad > 0) ? true : false;
    const list = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    
    const newCarrito = {
        cantidad: parseInt(cantidad), 
        producto: list[0].nombre_producto,
        user_id: req.user.id,
        producto_id: id
    };

    // COMPROBACION DE EXISTENCIA DEL PRODUCTO EN EL CARRITO
    const sql = await pool.query('SELECT * FROM carrito WHERE producto_id = ? AND user_id = ?', [newCarrito.producto_id, req.user.id]); 
    if (sql.length > 0 && cantidadPermitida === true) {
        
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

    } else if (cantidadPermitida === true) {

        await pool.query('INSERT INTO carrito set ?', [newCarrito]);
        req.flash('success', 'Producto añadido correctamente.' + newCarrito.producto);
        res.redirect('/carrito');
    
    } else {

        req.flash('message', 'Cantidad insuficiente, añada mas cantidad.');
        res.redirect(req.get('referer'));
    
    }

};

carritoCtrl.comprarCarrito = async (req, res) => {
    // Importa global para utilizar global.id declarado en mercadopago.js
    res.render('carrito/buy', {global});
};

module.exports = carritoCtrl;