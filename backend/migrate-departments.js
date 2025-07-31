const mongoose = require("mongoose");
const { Product, Department } = require("./db");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    console.log("Connected to MongoDB for migration");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

async function migrateDepartments() {
  try {
    console.log("Starting department migration...");

    // Step 1: Get all unique department names from products
    const uniqueDepartments = await Product.distinct("department");
    console.log(`Found ${uniqueDepartments.length} unique departments:`, uniqueDepartments);

    // Step 2: Create department documents
    const departmentDocs = uniqueDepartments
      .filter(dept => dept && dept.trim()) // Filter out null/empty departments
      .map((dept, index) => ({
        id: `dept_${index + 1}`,
        name: dept.trim(),
        created_at: new Date()
      }));

    console.log(`Creating ${departmentDocs.length} department records...`);

    // Step 3: Insert departments (use insertMany with ordered: false to handle duplicates)
    let insertedDepartments = [];
    try {
      insertedDepartments = await Department.insertMany(departmentDocs, { ordered: false });
      console.log(`Successfully inserted ${insertedDepartments.length} departments`);
    } catch (error) {
      // Handle duplicate key errors gracefully
      if (error.code === 11000) {
        console.log("Some departments already exist, continuing with migration...");
        // Get all existing departments
        insertedDepartments = await Department.find({});
      } else {
        throw error;
      }
    }

    // Step 4: Create a mapping of department name to department id
    const departmentMap = {};
    for (const dept of insertedDepartments) {
      departmentMap[dept.name] = dept.id;
    }

    console.log("Department mapping created:", departmentMap);

    // Step 5: Update all products to use department_id instead of department
    console.log("Updating products with department_id references...");
    
    const products = await Product.find({ department: { $exists: true, $ne: null } });
    console.log(`Found ${products.length} products to update`);

    let updatedCount = 0;
    for (const product of products) {
      if (product.department && departmentMap[product.department.trim()]) {
        await Product.updateOne(
          { _id: product._id },
          { 
            $set: { department_id: departmentMap[product.department.trim()] }
          }
        );
        updatedCount++;
      }
    }

    console.log(`Updated ${updatedCount} products with department_id references`);

    // Step 6: Verify the migration
    const productsWithDeptId = await Product.countDocuments({ department_id: { $exists: true, $ne: null } });
    const totalProducts = await Product.countDocuments({});
    
    console.log(`Migration verification:`);
    console.log(`- Total products: ${totalProducts}`);
    console.log(`- Products with department_id: ${productsWithDeptId}`);
    console.log(`- Products without department_id: ${totalProducts - productsWithDeptId}`);

    console.log("Department migration completed successfully!");

  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Function to remove the old department field (run this after verifying migration)
async function cleanupOldDepartmentField() {
  try {
    console.log("Removing old department field from products...");
    
    const result = await Product.updateMany(
      {},
      { $unset: { department: "" } }
    );
    
    console.log(`Removed department field from ${result.modifiedCount} products`);
  } catch (error) {
    console.error("Cleanup failed:", error);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    await migrateDepartments();
    
    // Uncomment the line below after verifying the migration is successful
    // await cleanupOldDepartmentField();
    
    console.log("Migration process completed!");
  } catch (error) {
    console.error("Migration process failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the migration if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { migrateDepartments, cleanupOldDepartmentField };
