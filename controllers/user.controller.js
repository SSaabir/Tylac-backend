import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import user from "../models/user.model.js";

// Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await user.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single user by ID
export const getSingleUser = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    try {
        const userEntry = await user.findById(id);
        if (!userEntry) {
            return next(errorHandler(404, 'User Not Found'));
        }
        res.status(200).json(userEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a user
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    try {
        const userEntry = await user.findByIdAndDelete(id);
        if (!userEntry) {
            return next(errorHandler(404, 'User Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a user
export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    try {
        const updatedUser = await user.findByIdAndUpdate(id, { name, email, role }, { new: true });
        if (!updatedUser) {
            return next(errorHandler(404, 'User Not Found'));
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new user
export const createUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    try {
        const newUser = new user({ name, email, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
