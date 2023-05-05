const db = require("../models/db");

//!==============================getAllProducts=============================

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

//!==============================search====================================

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

//!=========================================/category=======================

exports.category = (req, res) => {
  const category = req.params.category;
  const query = `SELECT * FROM products WHERE product_category = '${category}'`;

  db.query(query, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    else{
      //console.log(rows);
      res.json(rows);
    }
  });
};



//!================================add new product===========================

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body." });
  }
  const { product_name, product_quantity, product_brand, product_category } =
    req.body;
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
};
//!==========================/buy:id=========================================
exports.buy =(req,res) => {
  const product_id  = req.params.id;
  const quantity = req.body.quantity;
  db.query('SELECT * FROM products WHERE product_id = ?', [product_id ], (err, result) => {
    if (err) throw err;
    const product = result[0];
    if (quantity <= product.product_quantity) {
      const newQuantity = product.product_quantity - quantity;
      db.query('UPDATE products SET product_quantity = ? WHERE product_id = ?', [newQuantity, product_id], (err, result) => {
        if (err) throw err;
        res.send(`Successfully bought ${quantity} units of ${product.product_name}.`);
      });
    } else {
      res.status(400).send(`Only ${product.product_quantity} units of ${product.product_name} are available.`);
    }
  });
};

