-- drop db --
DROP DATABASE IF EXISTS bamazon_db;
-- create db --
CREATE DATABASE bamazon_db;
-- use bamazon db --
USE bamazon_db;
-- create products table --
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(75) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  stock_quantity INT NULL,
	PRIMARY KEY (item_id)
);
-- import product data from csv --
LOAD DATA INFILE '/Users/jb/Bootcamp/Homework/bamazon/products.csv'
INTO TABLE products
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
-- import failed with Error Code: 1290. The MySQL server is running with the --secure-file-priv option --
-- using workbench import instead --
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('1', 'Levis Jeans', 'Clothing', '45.00', '20');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('2', 'Bose Speakers', 'Electronics', '250.00', '50');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('3', 'Sony Vio Laptop', 'Computers', '2000.00', '20');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('4', 'Leather Sofa', 'Furniture', '3500.00', '2');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('5', 'Scissors', 'Office', '5.5', '200');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('6', 'Rain Jacket', 'Clothing', '65.75', '100');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('7', 'Guitar', 'Music', '99.95', '20');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('8', 'Ceiling Fan', 'Home', '155.96', '15');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('9', 'Snickers', 'Food', '2.00', '1000');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('10', 'Steak Knife', 'Kitchem', '12.95', '30');
-- view everything from products table --
SELECT * FROM products;

