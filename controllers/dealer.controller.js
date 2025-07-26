import dealer from '../models/dealer.model.js';
import mongoose from 'mongoose';  
import { errorHandler } from '../utils/error.js';

// Get all dealers
export const getAllDealers = async (req, res, next) => {
    try {
        const dealers = await dealer.find({}).sort({ createdAt: -1 });
        res.status(200).json(dealers);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single dealer by ID
export const getSingleDealer = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such dealer' });
    }

    try {
        const dealerEntry = await dealer.findById(id);
        if (!dealerEntry) {
            return next(errorHandler(404, 'Dealer Not Found'));
        }
        res.status(200).json(dealerEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a dealer
export const deleteDealer = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such dealer' });
    }

    try {
        const dealerEntry = await dealer.findByIdAndDelete(id);
        if (!dealerEntry) {
            return next(errorHandler(404, 'Dealer Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a dealer
export const updateDealer = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such dealer' });
    }

    try {
        const dealerEntry = await dealer.findByIdAndUpdate(id, { name, email, phone, address }, { new: true });
        if (!dealerEntry) {
            return next(errorHandler(404, 'Dealer Not Found'));
        }
        res.status(200).json(dealerEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new dealer
export const createDealer = async (req, res, next) => {
    const { name, email, phone, address } = req.body;

    try {
        const newDealer = new dealer({ name, email, phone, address });
        await newDealer.save();
        res.status(201).json(newDealer);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get dealer by email
export const getDealerByEmail = async (req, res, next) => {
    const { email } = req.params;

    try {
        const dealerEntry = await dealer.findOne({ email });
        if (!dealerEntry) {
            return next(errorHandler(404, 'Dealer Not Found'));
        }
        res.status(200).json(dealerEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get dealer by phone
export const getDealerByPhone = async (req, res, next) => {
    const { phone } = req.params;

    try {
        const dealerEntry = await dealer.findOne({ phone });
        if (!dealerEntry) {
            return next(errorHandler(404, 'Dealer Not Found'));
        }
        res.status(200).json(dealerEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
