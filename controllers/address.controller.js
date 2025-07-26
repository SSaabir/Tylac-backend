import mongoose from "mongoose";
import address from "../models/address.model.js";
import { errorHandler } from "../utils/error.js";

// Get all addresses
export const getAllAddresses = async (req, res, next) => {
    try {
        const addresses = await address.find({}).sort({ createdAt: -1 });
        res.status(200).json(addresses);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single address by ID
export const getSingleAddress = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such address' });
    }

    try {
        const addressEntry = await address.findById(id);
        if (!addressEntry) {
            return next(errorHandler(404, 'Address Not Found'));
        }
        res.status(200).json(addressEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete an address
export const deleteAddress = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such address' });
    }

    try {
        const addressEntry = await address.findByIdAndDelete(id);
        if (!addressEntry) {
            return next(errorHandler(404, 'Address Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update an address
export const updateAddress = async (req, res, next) => {
    const { id } = req.params;
    const { street, city, state, zipCode } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such address' });
    }

    try {
        const updatedAddress = await address.findByIdAndUpdate(id, { street, city, state, zipCode }, { new: true });
        if (!updatedAddress) {
            return next(errorHandler(404, 'Address Not Found'));
        }
        res.status(200).json(updatedAddress);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new address
export const createAddress = async (req, res, next) => {
    const { street, city, state, zipCode } = req.body;

    try {
        const newAddress = new address({ street, city, state, zipCode });
        await newAddress.save();
        res.status(201).json(newAddress);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
