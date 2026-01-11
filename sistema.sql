
CREATE TABLE categorias (
    id INT PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(250) NOT NULL
);


CREATE TABLE productos (
    id VARCHAR(50) PRIMARY KEY, 
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock_actual INT DEFAULT 0,
    categoria_id INT REFERENCES categorias(id)
);


CREATE TABLE usuarios (
    id serial PRIMARY KEY, 
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);



CREATE TABLE movimientos (
    id SERIAL PRIMARY KEY,
    producto_id VARCHAR(50) NOT NULL,
    usuario_id INT NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_producto
      FOREIGN KEY (producto_id)
      REFERENCES productos(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT,

    CONSTRAINT fk_usuario
      FOREIGN KEY (usuario_id)
      REFERENCES usuarios(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT,

    CONSTRAINT chk_tipo
      CHECK (tipo IN ('ENTRADA', 'SALIDA'))
);

SELECT * FROM movimientos;

