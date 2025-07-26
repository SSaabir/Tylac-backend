import category from '../models/category.model.js';
import mongoose from 'mongoose';
import { errorHandler } from '../utils/error.js';

// Get all categories
export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await category.find({}).sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single category by ID
export const getSingleCategory = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category' });
    }

    try {
        const categoryEntry = await category.findById(id);
        if (!categoryEntry) {
            return next(errorHandler(404, 'Category Not Found'));
        }
        res.status(200).json(categoryEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a category
export const deleteCategory = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category' });
    }

    try {
        const categoryEntry = await category.findByIdAndDelete(id);
        if (!categoryEntry) {
            return next(errorHandler(404, 'Category Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a category
export const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category' });
    }

    try {
        const updatedCategory = await category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return next(errorHandler(404, 'Category Not Found'));
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new category
export const createCategory = async (req, res, next) => {
    const { name, description } = req.body;

    try {
        const newCategory = new category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
