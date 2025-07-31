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

// Get all departments
router.get("/departments", async (req, res) => {
  try {
    const departments = await Department.find({}).sort({ name: 1 });
    console.log(`Found ${departments.length} departments`);
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
});

module.exports = router;
