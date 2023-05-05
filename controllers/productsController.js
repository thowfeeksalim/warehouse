const db = require("../models/db");

//!                            GET ALL PRODUCTS

exports.getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
};

//!                                SEARCH

exports.search = (req, res) => {
  const { search } = req.body;
  const query = `SELECT * FROM products WHERE product_name LIKE '%${search}%'`;

  db.query(query, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
};

//!                                CATEGORY

exports.category = (req, res) => {
  const category = req.params.category;
  const query = `SELECT * FROM products WHERE product_category = '${category}'`;

  db.query(query, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      //console.log(rows);
      res.json(rows);
    }
  });
};

//!                               ADD NEW PRODUCT

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body." });
  }
//?                    check if product is exit or not  

  const { product_name, product_quantity, product_brand, product_category } =
    req.body;

  db.query(
    "SELECT * FROM products WHERE product_name = ? AND product_brand = ? AND product_category = ?",
    [product_name, product_brand, product_category],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send("Error checking for existing product.");
      } else {
//?                    if exit just update product_quantity                   

        if (rows.length > 0) {
          const newQuantity = rows[0].product_quantity + product_quantity;
          db.query(
            "UPDATE products SET product_quantity = ? WHERE product_id = ?",
            [newQuantity, rows[0].product_id],
            (err, rows) => {
              if (err) {
                console.log(err);
                res.send("Error updating product quantity.");
              } else {
                res.send("Product quantity updated successfully.");
              }
            }
          );
        } else {
//?                   if not exit just added as new product

          db.query(
            "INSERT INTO products (product_name, product_quantity, product_brand, product_category) VALUES (?, ?, ?, ?)",
            [product_name, product_quantity, product_brand, product_category],
            (err, rows) => {
              if (!err) {
                res.send("Product added successfully.");
              } else {
                console.log(err);
                res.send("Error adding product.");
              }
            }
          );
        }
      }
    }
  );
};

//!                                 /BUY:ID

exports.buy = (req, res) => {
  const product_id = req.params.id;
  const quantity = req.body.quantity;
  db.query(
    "SELECT * FROM products WHERE product_id = ?",
    [product_id],
    (err, result) => {
      if (err) throw err;
      const product = result[0];
      if (quantity <= product.product_quantity) {
        const newQuantity = product.product_quantity - quantity;
        db.query(
          "UPDATE products SET product_quantity = ? WHERE product_id = ?",
          [newQuantity, product_id],
          (err, result) => {
            if (err) throw err;
            res.send(
              `Successfully bought ${quantity} units of ${product.product_name}.`
            );
          }
        );
      } else {
        res
          .status(400)
          .send(
            `Only ${product.product_quantity} units of ${product.product_name} are available.`
          );
      }
    }
  );
};

//!                                 DELETE

exports.delete = (req, res) => {
  const product_id = req.params.id;

  db.query(
    "DELETE FROM products WHERE product_id = ?",
    [product_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error deleting product.");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Product not found.");
      } else {
        res.send("Product deleted successfully.");
      }
    }
  );
};

