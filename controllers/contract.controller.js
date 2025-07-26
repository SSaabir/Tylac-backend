import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import contract from "../models/contract.model.js";

// Get all contracts
export const getAllContracts = async (req, res, next) => {
    try {
        const contracts = await contract.find({}).sort({ createdAt: -1 });
        res.status(200).json(contracts);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single contract by ID
export const getSingleContract = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such contract' });
    }

    try {
        const contractEntry = await contract.findById(id);
        if (!contractEntry) {
            return next(errorHandler(404, 'Contract Not Found'));
        }
        res.status(200).json(contractEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a contract
export const deleteContract = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such contract' });
    }

    try {
        const contractEntry = await contract.findByIdAndDelete(id);
        if (!contractEntry) {
            return next(errorHandler(404, 'Contract Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a contract
export const updateContract = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, startDate, endDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such contract' });
    }

    try {
        const updatedContract = await contract.findByIdAndUpdate(id, { title, description, startDate, endDate }, { new: true });
        if (!updatedContract) {
            return next(errorHandler(404, 'Contract Not Found'));
        }
        res.status(200).json(updatedContract);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new contract
export const createContract = async (req, res, next) => {
    const { title, description, startDate, endDate } = req.body;

    try {
        const newContract = new contract({ title, description, startDate, endDate });
        await newContract.save();
        res.status(201).json(newContract);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
