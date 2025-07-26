import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import role from "../models/role.model.js";

// Get all roles
export const getAllRoles = async (req, res, next) => {
    try {
        const roles = await role.find({}).sort({ createdAt: -1 });
        res.status(200).json(roles);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single role by ID
export const getSingleRole = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such role' });
    }

    try {
        const roleEntry = await role.findById(id);
        if (!roleEntry) {
            return next(errorHandler(404, 'Role Not Found'));
        }
        res.status(200).json(roleEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a role
export const deleteRole = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such role' });
    }

    try {
        const roleEntry = await role.findByIdAndDelete(id);
        if (!roleEntry) {
            return next(errorHandler(404, 'Role Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a role
export const updateRole = async (req, res, next) => {
    const { id } = req.params;
    const { name, permissions } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such role' });
    }

    try {
        const updatedRole = await role.findByIdAndUpdate(id, { name, permissions }, { new: true });
        if (!updatedRole) {
            return next(errorHandler(404, 'Role Not Found'));
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new role
export const createRole = async (req, res, next) => {
    const { name, permissions } = req.body;

    try {
        const newRole = new role({ name, permissions });
        await newRole.save();
        res.status(201).json(newRole);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

