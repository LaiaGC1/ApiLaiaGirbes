CREATE DATABASE clientesempresa;
USE clientesempresa;
CREATE TABLE cliente(
id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
razon_social VARCHAR(100),
provincia VARCHAR(100),
limite_credito VARCHAR(100)
);