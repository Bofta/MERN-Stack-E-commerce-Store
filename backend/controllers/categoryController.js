// This Page contains all Category CRUD Operations ( Create, Read , update and delete)

import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";


const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json("Please provide a name for the category");
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.json({ message: "Category already exists" }); // throw new Error("Category already exists");
        }

        const category = await new Category({name}).save();
        res.json(category); 

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});


const updateCategory = asyncHandler(async (req, res) => {
    try { 
        // Passare nome categoria nel body per poter modificarlo dopo 
        const {name} = req.body;
        // Passare id della categoria che voglio modificare
        const {categoryId} = req.params;

        // cercare la categoria usando mangose model schema nell database
        const category = await Category.findOne({ _id: categoryId });

        // if i dont find the category return an error
        if (!category) {
            return res.status(404).json({error: "Category not found"});
        }

        // senno se tutto funziona, modifico la categoria tranquilamente
        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);

    } catch { 
        console.error(error);
        res.status(500).json({ error: "Internal Server Error, cant update category" });
    }
});


const removeCategory = asyncHandler(async (req, res) => {
    try {
      const removed = await Category.findByIdAndDelete(req.params.categoryId);
      res.json(removed);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

const listCategory = asyncHandler(async (req, res) => {
    try { 
        const all = await Category.find({});
        res.json(all);
    } catch { 
        console.log(error);
        res.status(400).json(error.message);

    }
})


const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id});
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
})


export {createCategory, updateCategory, removeCategory, listCategory, readCategory}