import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./backend/models/userModel.js";
import Product from "./backend/models/productModel.js";
import Category from "./backend/models/categoryModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

// ─── Sample Users ────────────────────────────────────────────────────────────
const users = [
  {
    username: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    username: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    username: "Jane Doe",
    email: "jane@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

// ─── Sample Categories ───────────────────────────────────────────────────────
const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Books" },
  { name: "Home & Garden" },
  { name: "Sports" },
];

// ─── Import Data ─────────────────────────────────────────────────────────────
const importData = async () => {
  try {
    // Clear existing data
    

    // Insert users and categories
    const createdUsers = await User.insertMany(users);
    const createdCategories = await Category.insertMany(categories);

    // Map category names to their IDs for easy reference
    const electronics = createdCategories[0]._id;
    const clothing = createdCategories[1]._id;
    const books = createdCategories[2]._id;
    const homeGarden = createdCategories[3]._id;
    const sports = createdCategories[4]._id;

    // ─── Sample Products ───────────────────────────────────────────────────
    const sampleProducts = [
      {
        name: "iPhone 15 Pro",
        image: "/images/iphone15.jpg",
        brand: "Apple",
        quantity: 50,
        category: electronics,
        description:
          "The latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
        rating: 4.5,
        numReviews: 12,
        price: 999.99,
        countInStock: 25,
      },
      {
        name: "Samsung Galaxy S24",
        image: "/images/galaxys24.jpg",
        brand: "Samsung",
        quantity: 40,
        category: electronics,
        description:
          "Flagship Android phone with AI features, stunning display, and powerful processor.",
        rating: 4.3,
        numReviews: 8,
        price: 849.99,
        countInStock: 18,
      },
      {
        name: "Sony WH-1000XM5 Headphones",
        image: "/images/sonywh.jpg",
        brand: "Sony",
        quantity: 30,
        category: electronics,
        description:
          "Industry-leading noise canceling wireless headphones with 30-hour battery life.",
        rating: 4.8,
        numReviews: 20,
        price: 349.99,
        countInStock: 15,
      },
      {
        name: "MacBook Pro 14-inch",
        image: "/images/macbookpro.jpg",
        brand: "Apple",
        quantity: 20,
        category: electronics,
        description:
          "Powerful laptop with M3 Pro chip, Liquid Retina XDR display, and all-day battery.",
        rating: 4.9,
        numReviews: 15,
        price: 1999.99,
        countInStock: 10,
      },
      {
        name: "Nike Air Max 270",
        image: "/images/nikeairmax.jpg",
        brand: "Nike",
        quantity: 100,
        category: clothing,
        description:
          "Lifestyle shoe featuring the first-ever Max Air unit in the heel for all-day comfort.",
        rating: 4.2,
        numReviews: 30,
        price: 149.99,
        countInStock: 60,
      },
      {
        name: "Adidas Ultraboost 23",
        image: "/images/adidasultraboost.jpg",
        brand: "Adidas",
        quantity: 80,
        category: clothing,
        description:
          "Premium running shoes with responsive Boost midsole and Primeknit upper.",
        rating: 4.4,
        numReviews: 25,
        price: 189.99,
        countInStock: 45,
      },
      {
        name: "The Great Gatsby",
        image: "/images/gatsby.jpg",
        brand: "Scribner",
        quantity: 200,
        category: books,
        description:
          "F. Scott Fitzgerald's classic novel about the American Dream in the Jazz Age.",
        rating: 4.6,
        numReviews: 50,
        price: 12.99,
        countInStock: 150,
      },
      {
        name: "Atomic Habits",
        image: "/images/atomichabits.jpg",
        brand: "Avery",
        quantity: 150,
        category: books,
        description:
          "James Clear's practical guide to building good habits and breaking bad ones.",
        rating: 4.7,
        numReviews: 45,
        price: 16.99,
        countInStock: 100,
      },
      {
        name: "Dyson V15 Vacuum",
        image: "/images/dysonv15.jpg",
        brand: "Dyson",
        quantity: 25,
        category: homeGarden,
        description:
          "Powerful cordless vacuum with laser dust detection and intelligent suction.",
        rating: 4.6,
        numReviews: 18,
        price: 699.99,
        countInStock: 12,
      },
      {
        name: "Yoga Mat Pro",
        image: "/images/yogamat.jpg",
        brand: "Liforme",
        quantity: 60,
        category: sports,
        description:
          "Eco-friendly non-slip yoga mat with alignment markers, perfect for all levels.",
        rating: 4.5,
        numReviews: 22,
        price: 79.99,
        countInStock: 40,
      },
    ];

    await Product.insertMany(sampleProducts);

    console.log("✅ Data imported successfully!");
    console.log(`   👤 ${createdUsers.length} users created`);
    console.log(`   📁 ${createdCategories.length} categories created`);
    console.log(`   📦 ${sampleProducts.length} products created`);
    console.log("\n🔑 Admin login: admin@email.com / 123456");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// ─── Destroy Data ─────────────────────────────────────────────────────────────
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    console.log("🗑️  Data destroyed successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Run import or destroy based on flag
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

