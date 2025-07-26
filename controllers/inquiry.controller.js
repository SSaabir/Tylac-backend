import inquiry from '../models/inquiry.model.js';
import mongoose from 'mongoose';
import { errorHandler } from '../utils/error.js';

// Get all inquiries
export const getAllInquiries = async (req, res, next) => {
    try {
        const inquiries = await inquiry.find({}).sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single inquiry by ID
export const getSingleInquiry = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such inquiry' });
    }

    try {
        const inquiryEntry = await inquiry.findById(id);
        if (!inquiryEntry) {
            return next(errorHandler(404, 'Inquiry Not Found'));
        }
        res.status(200).json(inquiryEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete an inquiry
export const deleteInquiry = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such inquiry' });
    }

    try {
        const inquiryEntry = await inquiry.findByIdAndDelete(id);
        if (!inquiryEntry) {
            return next(errorHandler(404, 'Inquiry Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update an inquiry
export const updateInquiry = async (req, res, next) => {
    const { id } = req.params;
    const { subject, message, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such inquiry' });
    }

    try {
        const updatedInquiry = await inquiry.findByIdAndUpdate(id, { subject, message, status }, { new: true });
        if (!updatedInquiry) {
            return next(errorHandler(404, 'Inquiry Not Found'));
        }
        res.status(200).json(updatedInquiry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new inquiry
export const createInquiry = async (req, res, next) => {
    const { subject, message, userId } = req.body;

    try {
        const newInquiry = new inquiry({ subject, message, userId });
        await newInquiry.save();
        res.status(201).json(newInquiry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get inquiries by user ID
export const getInquiriesByUserId = async (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'No such user' });
    }

    try {
        const inquiries = await inquiry.find({ userId }).sort({ createdAt: -1 });
        if (!inquiries.length) {
            return next(errorHandler(404, 'No Inquiries Found for this User'));
        }
        res.status(200).json(inquiries);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get inquiries by status
export const getInquiriesByStatus = async (req, res, next) => {
    const { status } = req.params;

    try {
        const inquiries = await inquiry.find({ status }).sort({ createdAt: -1 });
        if (!inquiries.length) {
            return next(errorHandler(404, 'No Inquiries Found with this Status'));
        }
        res.status(200).json(inquiries);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
