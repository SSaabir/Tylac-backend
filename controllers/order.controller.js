import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import order from "../models/order.model.js";  

// Get all orders
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await order.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single order by ID
export const getSingleOrder = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' });
    }

    try {
        const orderEntry = await order.findById(id);
        if (!orderEntry) {
            return next(errorHandler(404, 'Order Not Found'));
        }
        res.status(200).json(orderEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete an order
export const deleteOrder = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' });
    }

    try {
        const orderEntry = await order.findByIdAndDelete(id);
        if (!orderEntry) {
            return next(errorHandler(404, 'Order Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update an order
export const updateOrder = async (req, res, next) => {
    const { id } = req.params;
    const { status, items, totalAmount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' });
    }

    try {
        const updatedOrder = await order.findByIdAndUpdate(id, { status, items, totalAmount }, { new: true });
        if (!updatedOrder) {
            return next(errorHandler(404, 'Order Not Found'));
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new order
export const createOrder = async (req, res, next) => {
    const { items, totalAmount, userId } = req.body;

    try {
        const newOrder = new order({ items, totalAmount, userId });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}