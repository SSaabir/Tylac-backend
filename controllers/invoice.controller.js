import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import invoice from "../models/invoice.model.js";

// Get all invoices
export const getAllInvoices = async (req, res, next) => {
    try {
        const invoices = await invoice.find({}).sort({ createdAt: -1 });
        res.status(200).json(invoices);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single invoice by ID
export const getSingleInvoice = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such invoice' });
    }

    try {
        const invoiceEntry = await invoice.findById(id);
        if (!invoiceEntry) {
            return next(errorHandler(404, 'Invoice Not Found'));
        }
        res.status(200).json(invoiceEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete an invoice
export const deleteInvoice = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such invoice' });
    }

    try {
        const invoiceEntry = await invoice.findByIdAndDelete(id);
        if (!invoiceEntry) {
            return next(errorHandler(404, 'Invoice Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update an invoice
export const updateInvoice = async (req, res, next) => {
    const { id } = req.params;
    const { amount, status, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such invoice' });
    }

    try {
        const updatedInvoice = await invoice.findByIdAndUpdate(id, { amount, status, dueDate }, { new: true });
        if (!updatedInvoice) {
            return next(errorHandler(404, 'Invoice Not Found'));
        }
        res.status(200).json(updatedInvoice);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new invoice
export const createInvoice = async (req, res, next) => {
    const { amount, status, dueDate } = req.body;

    try {
        const newInvoice = new invoice({ amount, status, dueDate });
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
