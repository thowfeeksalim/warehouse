const db = require("../models/db");

//!                            LIST CATEGORY

exports.listcategory = (req, res) => {
  const query = `SELECT * FROM category`;
  db.query(query, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
};

//!                            LIST BRAND

exports.listbrand = (req, res) => {
  const query = `SELECT * FROM brand`;
  db.query(query, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
};

//!                            LIST PRODUCTS

exports.listproducts = (req, res) => {
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

//!                             CATEGORY

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
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Missing request body." });
    }

    // check if category name is a string of characters
    const { category_name } = req.body;
    if (!/^[A-Za-z]+$/.test(category_name)) {
      return res
        .status(400)
        .json({ error: "Category name should contain only characters." });
    }

    // check if category already exists
    db.query(
      "SELECT * FROM category WHERE category_name = ?",
      [category_name],
      (err, rows) => {
        if (err) {
          console.log(err);
          res.send("Error checking for existing category.");
        } else {
          if (rows.length > 0) {
            // category already exists
            res.status(400).json({ error: "Category already exists." });
          } else {
            // add category
            db.query(
              "INSERT INTO category (category_name) VALUES (?)",
              [category_name],
              (err, rows) => {
                if (!err) {
                  res.send("Category added successfully.");
                } else {
                  console.log(err);
                  res.send("Error adding category.");
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

//!                               /ADD BRAND

exports.addbrand = (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Missing request body." });
    }

    // check if brand_name and category_id are strings of characters
    const { brand_name, category_id } = req.body;
    if (!/^[A-Za-z]+$/.test(brand_name)) {
      return res
        .status(400)
        .json({ error: "Brand name should contain only characters." });
    }
    if (isNaN(category_id) || category_id <= 0) {
      return res
        .status(400)
        .json({ error: "Category ID should contain only integers." });
    }
    // check if brand already exists
    db.query(
      "SELECT * FROM brand WHERE brand_name = ? AND  category_id = ?",
      [brand_name, category_id],
      (err, rows) => {
        if (err) {
          console.log(err);
          res.send("Error checking for existing brand.");
        } else {
          if (rows.length > 0) {
            // brand already exists
            res.status(400).json({ error: "Brand already exists." });
          } else {
            // add brand
            db.query(
              "INSERT INTO brand (brand_name, category_id) VALUES (?,?)",
              [brand_name, category_id],
              (err, rows) => {
                if (!err) {
                  res.send("Brand added successfully.");
                } else {
                  res.status(400).json({ error: "incorrect category_id" });
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error." });
  }
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
  try {
    if (isNaN(quantity) || quantity <= 0)
      throw new Error("Please enter a valid number");
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
  db.query(
    "SELECT * FROM products WHERE product_id = ?",
    [product_id],
    (err, result) => {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Something went wrong",
          error: err.stack,
        });
        return;
      }
      if (result.length === 0) {
        res.status(400).send("Please enter valid product_id");
        return;
      }
      const product = result[0];
      if (quantity <= product.product_quantity) {
        const newQuantity = product.product_quantity - quantity;
        db.query(
          "UPDATE products SET product_quantity = ? WHERE product_id = ?",
          [newQuantity, product_id],
          (err, result) => {
            if (err) {
              res.status(500).json({
                status: "error",
                message: "Something went wrong",
                error: err.stack,
              });
              return;
            }
            res.send(
              `Successfully bought ${quantity} units of ${product.product_name}.`
            );
          }
        );
      } else {
        res.status(400).send(
          // `Only ${product.product_quantity} units of ${product.product_name} are available.`
          `OUT OF STOCK`
        );
      }
    }
  );
};

//!                            EDIT CATEGORY

exports.editcategory = (req, res) => {
  const category_id = req.params.category_id;
  const { category_name } = req.body;
  db.query(
    `UPDATE category SET 
      category_name = ?,
      updated_date = NOW()
    WHERE category_id = ?`,
    [category_name, category_id],
    (error, results, fields) => {
      if (error) throw error;

      db.query(
        "SELECT * FROM category WHERE category_id = ?",
        [category_id],
        (error, results, fields) => {
          if (error) throw error;

          res.status(200).json(results[0]);
        }
      );
    }
  );
};

//!                            EDIT BRAND

exports.editbrand = (req, res) => {
  const brand_id = req.params.brand_id;
  const { brand_name } = req.body;
  db.query(
    `UPDATE brand SET 
      brand_name = ?,
      updated_date = NOW()
    WHERE brand_id = ?`,
    [brand_name, brand_id],
    (error, results, fields) => {
      if (error) throw error;

      db.query(
        "SELECT * FROM brand WHERE brand_id = ?",
        [brand_id],
        (error, results, fields) => {
          if (error) throw error;

          res.status(200).json(results[0]);
        }
      );
    }
  );
};

//!                            EDIT PRODUCT

exports.editproduct = (req, res) => {
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

//!                DELETE CATEGORYID

exports.deletecategoryid = (req, res) => {
  const category_id = req.params.id;

  db.query(
    "DELETE FROM category WHERE category_id = ?",
    [category_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error deleting category.");
      } else if (result.affectedRows === 0) {
        res.status(404).send("category not found.");
      } else {
        res.send("category deleted successfully.");
      }
    }
  );
};

//!                DELETE BRANDID

exports.deletebrandid = (req, res) => {
  const brand_id = req.params.id;

  db.query(
    "DELETE FROM brand WHERE brand_id = ?",
    [brand_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error deleting brand.");
      } else if (result.affectedRows === 0) {
        res.status(404).send("brand not found.");
      } else {
        res.send("brand deleted successfully.");
      }
    }
  );
};

//!                DELETE PRODUCTID

exports.deleteproductid = (req, res) => {
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
