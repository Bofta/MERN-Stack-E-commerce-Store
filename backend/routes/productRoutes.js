import express from "express"
import formidable from 'express-formidable'
const router = express.Router();

// Controllers
import { addProduct,
        updateProductDetails,
        removeProduct,
        fetchProducts,
        fetchProductById,
        fetchAllProducts,
        addProductReview,
        fetchTopProducts,
        fetchNewProducts } from "../controllers/productController.js";

import {authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

import checkId from '../middlewares/checkId.js';


// Fetch max of 6 products in the page
router.route("/").get(fetchProducts).post(authenticate, authorizeAdmin, formidable(), addProduct);

// fetch all products
router.route('/allProducts').get(fetchAllProducts);
// Adding reviews to products route
router.route('/:id/reviews').post(authenticate, authorizeAdmin, checkId, addProductReview);

// Fetch top products route
router.get("/top", fetchTopProducts);
// fetch new products route
router.get("/new", fetchNewProducts);

// Fetch, update product details and delete routes
router.route('/:id')
.get(fetchProductById)
.put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
.delete(authenticate, authorizeAdmin, removeProduct);

export default router;