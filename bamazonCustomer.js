var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

// connect to bamazon database and either throw error or START shopping
connection.connect(function (err) {
  if (err) throw err;
  console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
  console.log("You are connected as id " + connection.threadId + ".    Welcome to Bamazon!");
  console.log("\n");
  start();
});

function start(res, err) {
  // use product table in bamazon mysql database
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw (err);
    console.log(Table.print(res));
    // start conversation with customer
    inquirer.prompt([{
      name: 'bamazonCustomer',
      message: "Would you like to purchase something?",
      type: 'list',
      choices: ['Yes', 'No']
    }]).then(function (answer) {
      // choices displayed if yes 
      if (answer.bamazonCustomer === 'Yes') {
        menu();
      } else {
        // End Connection
        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
        console.log("Thank you for looking. Please come back again.");
        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
        connection.end();
      }
    });
  });
}

function menu() {
  inquirer.prompt([{
      message: "Please enter the item ID as shown in the table",
      type: "input",
      name: "item"
    },
    {
      message: "How many would you like?",
      type: "input",
      name: "quantity"
    }

  ]).then(function (input) {
    var item = input.item;
    var quantity = input.quantity;

    // check to make sure qauntity is available
    var queryStr = "SELECT * FROM products WHERE ?";

    connection.query(queryStr, {
      item_id: item
    }, function (err, data) {
      if (err) throw err;
      if (data.length === 0) {
        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
        console.log("Item ID is not available.  Please check your input and try again.");
        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

        start(); //start over

      } else {
        var productData = data[0];

        if (quantity <= productData.stock_quantity) {
          // Updating inventory
          var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;
          // Sale is a Success
          connection.query(updateQueryStr, function (err, data) {
            if (err) throw err;
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
            console.log("Your total is $" + productData.price * quantity);
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
            inquirer.prompt([{
              name: 'bamazonCustomer',
              message: "Would you like to purchase something else today?",
              type: 'list',
              choices: ['Yes', 'No']
            }]).then(function (answer) {
              // choices displayed if yes 
              if (answer.bamazonCustomer === 'Yes') {
                menu();
              } else {
                // End Connection
                console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
                console.log("Thank you for your business.  Please stop back soon.");
                console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
                connection.end();
              }
            });

          });

        } else {

          console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
          console.log("We don't have that many in stock, please try a lower number.");
          console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

          start(); // start over
        }
      }
    });
  });
}