const express = require("express");
const router = express.Router();
const { Product, Department } = require("../db");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});

    // Get all departments for lookup
    const departments = await Department.find({});
    const departmentMap = {};
    departments.forEach((dept) => {
      departmentMap[dept.id] = { id: dept.id, name: dept.name };
    });

    // Add department info to products
    const productsWithDepartments = products.map((product) => {
      const productObj = product.toObject();
      if (productObj.department_id && departmentMap[productObj.department_id]) {
        productObj.department_info = departmentMap[productObj.department_id];
      }
      return productObj;
    });

    console.log(`Found ${products.length} products`);
    res.json(productsWithDepartments);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product)
      return res.status(404).json({ message: "Invalid product id." });

    // Get department info if department_id exists
    let productWithDepartment = product.toObject();
    if (product.department_id) {
      const department = await Department.findOne({
        id: product.department_id,
      });
      if (department) {
        productWithDepartment.department_info = {
          id: department.id,
          name: department.name,
        };
      }
    }

    res.json(productWithDepartment);
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// Get all departments with product counts
router.get("/departments", async (req, res) => {
  try {
    const departments = await Department.find({}).sort({ name: 1 });

    // Get product counts for each department
    const departmentsWithCounts = await Promise.all(
      departments.map(async (dept) => {
        const productCount = await Product.countDocuments({
          department_id: dept.id,
        });
        return {
          ...dept.toObject(),
          product_count: productCount,
        };
      })
    );

    console.log(`Found ${departments.length} departments`);
    res.json(departmentsWithCounts);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
});

// Get specific department by id
router.get("/departments/:id", async (req, res) => {
  try {
    const department = await Department.findOne({ id: req.params.id });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Get product count for this department
    const productCount = await Product.countDocuments({
      department_id: department.id,
    });

    const departmentWithCount = {
      ...department.toObject(),
      product_count: productCount,
    };

    console.log(
      `Found department: ${department.name} with ${productCount} products`
    );
    res.json(departmentWithCount);
  } catch (error) {
    console.error("Error fetching department:", error);
    res
      .status(500)
      .json({ message: "Error fetching department", error: error.message });
  }
});

// Get all products within a specific department
router.get("/departments/:id/products", async (req, res) => {
  try {
    // First check if department exists
    const department = await Department.findOne({ id: req.params.id });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Get all products for this department
    const products = await Product.find({ department_id: req.params.id });

    if (products.length === 0) {
      return res.json({
        department: {
          id: department.id,
          name: department.name,
        },
        products: [],
        total_products: 0,
        message: "No products found in this department",
      });
    }

    // Add department info to each product
    const productsWithDepartment = products.map((product) => {
      const productObj = product.toObject();
      productObj.department_info = {
        id: department.id,
        name: department.name,
      };
      return productObj;
    });

    console.log(
      `Found ${products.length} products in department: ${department.name}`
    );
    res.json({
      department: {
        id: department.id,
        name: department.name,
      },
      products: productsWithDepartment,
      total_products: products.length,
    });
  } catch (error) {
    console.error("Error fetching department products:", error);
    res
      .status(500)
      .json({
        message: "Error fetching department products",
        error: error.message,
      });
  }
});

module.exports = router;
