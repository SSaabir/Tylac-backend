import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import product from "../models/product.model.js";

// Get all products
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await product.find({}).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single product by ID
export const getSingleProduct = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' });
    }

    try {
        const productEntry = await product.findById(id);
        if (!productEntry) {
            return next(errorHandler(404, 'Product Not Found'));
        }
        res.status(200).json(productEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a product
export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' });
    }

    try {
        const productEntry = await product.findByIdAndDelete(id);
        if (!productEntry) {
            return next(errorHandler(404, 'Product Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a product
export const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' });
    }

    try {
        const updatedProduct = await product.findByIdAndUpdate(id, { name, description, price, category, stock }, { new: true });
        if (!updatedProduct) {
            return next(errorHandler(404, 'Product Not Found'));
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new product
export const createProduct = async (req, res, next) => {
    const { name, description, price, category, stock } = req.body;

    try {
        const newProduct = new product({ name, description, price, category, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
