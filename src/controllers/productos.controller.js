const productosCtrl = {};

const pool = require('../database');

// ADD PRODUCTO || AÑADIR PRODUCTO

productosCtrl.renderAddProducto = (req, res) => {
    res.render('productos/add');
};

productosCtrl.addProducto = async (req, res) => {
    const { nombre_producto, stock, description, categoria, precio } = req.body; // Guarda los valores recibidos del form de /add
    const newProduct = {
        nombre_producto,
        stock,
        description,
        categoria,
        precio
    };
 
    await pool.query('INSERT INTO productos set ?', [newProduct]);
    req.flash('success', 'Producto guardado correctamente.');
    res.redirect('/productos');
};

// LISTA DE TODOS LOS PRODUCTOS

productosCtrl.renderProductos = async (req, res) => {
    const productos = await pool.query('SELECT * FROM productos');
    res.render('productos/list', {productos});
};

// DELETE PRODUCTO || ELIMINAR PRODUCTO 

productosCtrl.deleteProducto = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    req.flash('success', 'Producto removido satisfactorio.');
    req.redirect('/productos');
};

// EDIT PRODUCTOS || EDITAR PRODUCTOS

productosCtrl.renderEditProducto = async (req, res) => {
    const {id} = req.params;
    const productos = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    res.render('productos/edit', {productos: productos[0]});
};

productosCtrl.editProducto = async (req, res) => {
    const {id} = req.params;
    const {nombre_producto, stock, description, categoria, precio} = req.body;
    const newProduct = {
        nombre_producto,
        stock,
        description,
        categoria,
        precio
    };

    await pool.query('UPDATE productos set ? WHERE id = ?', [newProduct, id]);
    req.flash('success', 'Producto editado exitosamente');
    res.redirect('/productos');
};

// SHOP || TIENDA

productosCtrl.renderTienda = async (req, res) => {
    const productos = await pool.query('SELECT * FROM productos');
    res.render('tienda/list', {productos});
};

productosCtrl.renderTiendaProducto = async (req, res) => {
    const {id} = req.params;
    const producto = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);

    res.render('tienda/view', {producto: producto[0]});
};

module.exports = productosCtrl;

