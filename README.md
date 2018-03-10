# bamazon

## Client Interface

Bamazon is an e-commerce application created in javascript.

The application is launched thrugh the terminal with the command:

 `node bamazonCustomer`

## Third Pary Apps

Bamazon relies heavily on node and mysql, as well as the npm modules [mysql](https://www.npmjs.com/package/mysql), [inquirer](https://www.npmjs.com/package/inquirer) and [easy-table](https://www.npmjs.com/package/easy-table).  The packages are are listed as dependencies in the the [package.json](./package.json) file.

## Video Demonstration

A [short video of the application](./videos/bamazon.mp4) is included for your pleasure.

## Backend

The bamazon database is created in mysql and primarily managed through mysql workbench. The table includes the colums item_id, product_name, department_name, price, stock_quantity and layed out in the manner that follows.

| Column A | Column B | Column C | Column D | Column D |
|:---------|:---------|:---------|:---------|:---------|
| A1       | B1       | C1       | D1       | D1       |
| A2       | B2       | C2       | D2       | D1       |
| A3       | B3       | C3       | D3       | D1       |

Customer actions dynamically alter available quanties and total sales numbers, as shown in the video.