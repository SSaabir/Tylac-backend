import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import color from "../models/color.model.js";

// Get all colors
export const getAllColors = async (req, res, next) => {
    try {
        const colors = await color.find({}).sort({ createdAt: -1 });
        res.status(200).json(colors);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single color by ID
export const getSingleColor = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such color' });
    }

    try {
        const colorEntry = await color.findById(id);
        if (!colorEntry) {
            return next(errorHandler(404, 'Color Not Found'));
        }
        res.status(200).json(colorEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a color
export const deleteColor = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such color' });
    }

    try {
        const colorEntry = await color.findByIdAndDelete(id);
        if (!colorEntry) {
            return next(errorHandler(404, 'Color Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a color
export const updateColor = async (req, res, next) => {
    const { id } = req.params;
    const { name, hexCode } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such color' });
    }

    try {
        const updatedColor = await color.findByIdAndUpdate(id, { name, hexCode }, { new: true });
        if (!updatedColor) {
            return next(errorHandler(404, 'Color Not Found'));
        }
        res.status(200).json(updatedColor);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new color
export const createColor = async (req, res, next) => {
    const { name, hexCode } = req.body;

    try {
        const newColor = new color({ name, hexCode });
        await newColor.save();
        res.status(201).json(newColor);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
