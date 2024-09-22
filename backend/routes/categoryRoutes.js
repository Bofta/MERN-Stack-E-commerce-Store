import express from "express";
const router = express.Router();
import { createCategory,
         updateCategory,
         removeCategory,
         listCategory,
         readCategory}
         from "../controllers/categoryController.js";

import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js";


// Route method to create a new category using createCategory method which is in categoryController
router.route("/").post(authenticate, authorizeAdmin, createCategory);
// Route to update a category using updateCategory method which is in categoryController
router.route("/:categoryId")
.put(authenticate, authorizeAdmin, updateCategory);
// Route To delete a category using deleteCategory method which is in categoryController
router.route("/:categoryId")
.delete(authenticate, authorizeAdmin, removeCategory);


// List all exsiting categories 
router.route("/categories").get(listCategory);
// List a specific category 
router.route('/:id').get(readCategory);

export default router;