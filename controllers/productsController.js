const db = require("../models/db");

//!                            GET ALL PRODUCTS

exports.getAllProducts = (req, res) => {
  const query = `
  SELECT 
  p.product_id, 
  p.product_quantity,
  p.product_name,  
  b.brand_name, 
  p.created_date, 
  p.updated_date,
  c.category_name
FROM 
  products p
  LEFT JOIN brand b ON p.product_brand = b.brand_id
  LEFT JOIN category c ON p.product_category = c.category_id;
`;
  db.query(query, (err, rows) => {
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
  const query = `
  SELECT 
  p.product_id, 
  p.product_quantity, 
  p.product_name, 
  b.brand_name, 
  c.category_name,
  p.created_date, 
  p.updated_date
FROM 
  products p
  LEFT JOIN brand b ON p.product_brand = b.brand_id
  LEFT JOIN category c ON p.product_category = c.category_id
  WHERE product_name LIKE '%${search}%'`;

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
  const query = `
  SELECT 
  p.product_id, 
  p.product_quantity, 
  p.product_name, 
  b.brand_name, 
  c.category_name,
  p.created_date, 
  p.updated_date
FROM 
  products p
  LEFT JOIN brand b ON p.product_brand = b.brand_id
  LEFT JOIN category c ON p.product_category = c.category_id
WHERE category_name = '${category}'`;
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

//!                                  BRAND

exports.brand = (req, res) => {
  const brand = req.params.brand;
  const query = `
  SELECT 
  p.product_id, 
  p.product_quantity, 
  p.product_name, 
  b.brand_name, 
  c.category_name,
  p.created_date, 
  p.updated_date
FROM 
  products p
  LEFT JOIN brand b ON p.product_brand = b.brand_id
  LEFT JOIN category c ON p.product_category = c.category_id
WHERE brand_name = '${brand}'`;

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

//!                         BRAND AND CATEGORY

exports.categorybrand = (req, res) => {
  const brand = req.params.brand;
  const category = req.params.category;
  const query = `
  SELECT 
  p.product_id, 
  p.product_quantity, 
  p.product_name, 
  b.brand_name, 
  c.category_name,
  p.created_date, 
  p.updated_date
FROM 
  products p
  LEFT JOIN brand b ON p.product_brand = b.brand_id
  LEFT JOIN category c ON p.product_category = c.category_id
WHERE brand_name = '${brand}' AND category_name = '${category}'`;

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

//!                               /ADD CATEGORY

exports.addcategory = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body." });
  }
  
  //?                    check if product is exit or not
  

  const { category_name } =
    req.body;

  db.query(
    "SELECT * FROM brand WHERE category_name = ?",
    [category_name],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send("Error checking for existing category.");
      } else {
          //?                   if not exit just added as new category

          db.query(
            "INSERT INTO brand (category_name) VALUES (?,?)",
            [category_name],
            (err, rows) => {
              if (!err) {
                res.send("category added successfully.");
              } else {
                console.log(err);
                res.send("Error adding category.");
              }
            }
          );
        }
      }
  );
}; 




//!                               /ADD BRAND


exports.addbrand = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body." });
  }
  const { brand_name, category_id } =
    req.body;

  db.query(
    "SELECT * FROM brand WHERE brand_name = ? AND  category_id = ?",
    [brand_name, category_id],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send("Error checking for existing brand.");
      } else {
          //?                   if not exit just added as new brand
          db.query(
            "INSERT INTO brand (brand_name, category_id) VALUES (?,?)",
            [brand_name, category_id],
            (err, rows) => {
              if (!err) {
                res.send("brand added successfully.");
              } else {
                console.log(err);
                res.send("Error adding brand.");
              }
            }
          );
        }
      }
  );
}; 





//!                               ADD PRODUCT

exports.addproduct = (req, res) => {
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

//!                                    EDIT


exports.edit = (req, res) => {
  const product_id = req.params.product_id;
  const { product_name, product_quantity, product_category, product_brand } =
    req.body;
  db.query(
    `UPDATE products SET 
      product_name = ?,
      product_quantity = ?,
      product_category = ?,
      product_brand = ?,
      updated_date = NOW()
    WHERE product_id = ?`,
    [
      product_name,
      product_quantity,
      product_category,
      product_brand,
      product_id,
    ],
    (error, results, fields) => {
      if (error) throw error;

      db.query(
        "SELECT * FROM products WHERE product_id = ?",
        [product_id],
        (error, results, fields) => {
          if (error) throw error;

          res.status(200).json(results[0]);
        }
      );
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
