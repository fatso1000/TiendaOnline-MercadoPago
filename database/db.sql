CREATE DATABASE darlingphotos;

USE darlingphotos;

-- TABLA USUARIOS
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users 
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE users  
    ADD CONSTRAINT unique_user UNIQUE KEY(username);

DESCRIBE users;

-- CREATE TABLE profile_img(
--     user_id INT(11) UNIQUE,
--     directory VARCHAR(250),
--     CONSTRAINT keyForeign FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- TABLA PEDIDOS
CREATE TABLE carrito(
    id INT(11) NOT NULL,
    producto VARCHAR(150) NOT NULL,
    cantidad INT(2) NOT NULL,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE carrito
    ADD PRIMARY KEY (id);

ALTER TABLE carrito
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE carrito
    ADD producto_id VARCHAR(150);

ALTER TABLE carrito
    ADD CONSTRAINT product_fk FOREIGN KEY (producto_id) REFERENCES productos(id);


-- TABLA PRODUCTOS
CREATE TABLE productos(
    id INT(11) NOT NULL,
    nombre_producto VARCHAR(150) NOT NULL,
    stock INT(3) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE productos
    ADD PRIMARY KEY (id);

ALTER TABLE productos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE productos
    ADD categoria VARCHAR(150) NOT NULL;

ALTER TABLE productos  
    ADD precio DECIMAL(5, 2) NOT NULL;