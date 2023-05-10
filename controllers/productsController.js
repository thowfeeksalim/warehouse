const db = require("../models/db");

//!                            LIST CATEGORY

exports.listcategory = (req, res) => {
  const query = `SELECT * FROM category`;
  db.query(query, (err, rows) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
};

//!                            LIST BRAND

exports.listbrand = (req, res) => {
  const query = `
    SELECT 
  b.brand_id,
  b.brand_name, 
  b.category_id,
  c.category_name,
  c.created_date,
  c.updated_date
  FROM brand b LEFT JOIN category c ON b.category_id = c.category_id;
  `;
  db.query(query, (err, rows) => {
    if (err) {
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
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
};

//!                             LIST SEARCH

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
      res.status(500).send("Internal Server Error");
    } else {
      if (rows.length === 0) {
        res.send("Sorry,Product not found");
      } else {
        res.json(rows);
      }
    }
  });
};

//!                           LIST CATEGORY

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
      res.status(500).send("Internal Server Error");
    } else {
      //console.log(rows);
      res.json(rows);
    }
  });
};

//!                                LIST BRAND

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
      res.status(500).send("Internal Server Error");
    } else {
      //console.log(rows);
      res.json(rows);
    }
  });
};

//!                       LIST BRAND AND CATEGORY

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
      res.status(500).send("Internal Server Error");
    } else {
      if (rows.length === 0) {
        res.send("Sorry,Product not found");
      } else {
        res.json(rows);
      }
    }
  });
};

//!                               /ADD CATEGORY

exports.addcategory = (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Missing request body.");
    }

    // check if category name is a string of characters
    const { category_name } = req.body;
    if (!/^[A-Za-z]+$/.test(category_name)) {
      throw new Error("Category name should contain only characters.");
    }

    // check if category already exists
    db.query(
      "SELECT * FROM category WHERE category_name = ?",
      [category_name],
      (err, rows) => {
        if (err) {
          res.status(500).send("Error checking for existing category.");
        } else {
          if (rows.length > 0) {
            // category already exists
            res.status(400).send("Category already exists.");
          } else {
            // add category
            db.query(
              "INSERT INTO category (category_name) VALUES (?)",
              [category_name],
              (err, rows) => {
                if (err) {
                  res.status(500).send("Error adding category.");
                } else {
                  res.send("Category added successfully.");
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
};




//!                               /ADD BRAND

exports.addbrand = (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("Missing request body.");
    }

    // check if brand_name and category_id are strings of characters
    const { brand_name, category_id } = req.body;
    if (!/^[A-Za-z]+$/.test(brand_name)) {
      return res.status(400).send("Brand name should contain only characters.");
    }
    if (isNaN(category_id) || category_id <= 0) {
      return res.status(400).send("Category ID should contain only integers.");
    }
    // check if brand already exists
    db.query(
      "SELECT * FROM brand WHERE brand_name = ? AND  category_id = ?",
      [brand_name, category_id],
      (err, rows) => {
        if (err) {
          res.send("Error checking for existing brand.");
        } else {
          if (rows.length > 0) {
            // brand already exists
            res.status(400).send("Brand already exists.");
          } else {
            // add brand
            db.query(
              "INSERT INTO brand (brand_name, category_id) VALUES (?,?)",
              [brand_name, category_id],
              (err, rows) => {
                if (!err) {
                  res.send("Brand added successfully.");
                } else {
                  res.status(400).send("incorrect category_id");
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
};

//!                               ADD PRODUCT

exports.addproduct = (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("Missing request body.");
    }

    const { product_name, product_quantity, product_brand, product_category } =
      req.body;

    if (!Number.isInteger(product_quantity) || product_quantity <= 0) {
      throw new Error("Product quantity must be an integer.");
    }

    if (!Number.isInteger(product_brand) || product_brand <= 0) {
      throw new Error("Product brand must be an integer.");
    }

    if (!Number.isInteger(product_category) || product_category <= 0) {
      throw new Error("Product category must be an integer.");
    }

    db.query(
      "SELECT * FROM products WHERE product_name = ? AND product_brand = ? AND product_category = ?",
      [product_name, product_brand, product_category],
      (err, rows) => {
        if (err) {
          res.send("Error checking for existing product.");
        } else {
          if (rows.length > 0) {
            const newQuantity = rows[0].product_quantity + product_quantity;
            db.query(
              "UPDATE products SET product_quantity = ? WHERE product_id = ?",
              [newQuantity, rows[0].product_id],
              (err, rows) => {
                if (err) {
                  res.send("Error updating product quantity.");
                } else {
                  res.send(
                    "Product is already exit So, Product quantity updated successfully."
                  );
                }
              }
            );
          } else {
            db.query(
              "INSERT INTO products (product_name, product_quantity, product_brand, product_category) VALUES (?, ?, ?, ?)",
              [product_name, product_quantity, product_brand, product_category],
              (err, rows) => {
                if (!err) {
                  res.send("Product added successfully.");
                } else {
                  res.send("Error adding product.");
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    res.status(400).send("error");
  }
};

//!                                 /BUY:ID

exports.buy = (req, res) => {
  const product_id = req.params.id;
  const quantity = req.body.quantity;
  try {
    if (isNaN(quantity) || quantity <= 0)
      new Error("Please enter a valid number");
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
  if (!/^[A-Za-z]+$/.test(category_name)) {
    return res
      .status(400)
      .send("Category_name  should contain only characters.");
  }
  db.query(
    `UPDATE category SET 
      category_name = ?,
      updated_date = NOW()
    WHERE category_id = ?`,
    [category_name, category_id],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send("Invalid category id or Internal Server Error");
      } else {
        if (results.affectedRows === 0) {
          res.send("Invalid category_id");
        } else {
          res.send("Category updated successfully");
        }
      }
    }
  );
};

//!                            EDIT BRAND

exports.editbrand = (req, res) => {
  const brand_id = req.params.brand_id;
  const { brand_name } = req.body;
  if (!/^[A-Za-z]+$/.test(brand_name)) {
    return res.status(400).send("brand_name  should contain only characters.");
  }
  db.query(
    `UPDATE brand SET 
      brand_name = ?,
      updated_date = NOW()
    WHERE brand_id = ?`,
    [brand_name, brand_id],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        if (results.affectedRows === 0) {
          res.send("Invalid brand_id");
        } else {
          res.send("brand name updated successfully");
        }
      }
    }
  );
};

//!                            EDIT PRODUCT

exports.editproduct = (req, res) => {
  const product_id = req.params.product_id;
  const { product_name, product_quantity, product_category, product_brand } =
    req.body;

  // Check if product_id is a valid integer
  if (isNaN(parseInt(product_id))) {
    res.status(400).send("Invalid product_id");
    return;
  }

  // Check if product_quantity, product_category, and product_brand are valid integers and greater than 0
  if (
    isNaN(parseInt(product_quantity)) ||
    isNaN(parseInt(product_category)) ||
    isNaN(parseInt(product_brand)) ||
    parseInt(product_quantity) <= 0 ||
    parseInt(product_category) <= 0 ||
    parseInt(product_brand) <= 0
  ) {
    res.status(400).send("Invalid product quantity, category, or brand");
    return;
  }

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
      //

      db.query(
        "SELECT * FROM products WHERE product_id = ?",
        [product_id],
        (error, results, fields) => {
          //
          res.status(200).send("Product updated successfully");
        }
      );
    }
  );
};

//!                DELETE CATEGORYID

exports.deletecategoryid = (req, res) => {
  const category_id = req.params.id;
  if (isNaN(parseInt(category_id))) {
    res.status(400).send("Invalid category_id");
    return;
  }
  db.query(
    "DELETE FROM category WHERE category_id = ?",
    [category_id],
    (err, result) => {
      if (err) {
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
  if (isNaN(parseInt(brand_id))) {
    res.status(400).send("Invalid brand_id");
    return;
  }
  db.query(
    "DELETE FROM brand WHERE brand_id = ?",
    [brand_id],
    (err, result) => {
      if (err) {
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
  if (isNaN(parseInt(product_id))) {
    res.status(400).send("Invalid product_id");
    return;
  }
  db.query(
    "DELETE FROM products WHERE product_id = ?",
    [product_id],
    (err, result) => {
      if (err) {
        res.send("Error deleting product.");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Product not found.");
      } else {
        res.send("Product deleted successfully.");
      }
    }
  );
};
