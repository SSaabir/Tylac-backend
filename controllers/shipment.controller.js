import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import shipment from "../models/shipment.model.js"; 

// Get all shipments
export const getAllShipments = async (req, res, next) => {
    try {
        const shipments = await shipment.find({}).sort({ createdAt: -1 });
        res.status(200).json(shipments);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single shipment by ID
export const getSingleShipment = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such shipment' });
    }

    try {
        const shipmentEntry = await shipment.findById(id);
        if (!shipmentEntry) {
            return next(errorHandler(404, 'Shipment Not Found'));
        }
        res.status(200).json(shipmentEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a shipment
export const deleteShipment = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such shipment' });
    }

    try {
        const shipmentEntry = await shipment.findByIdAndDelete(id);
        if (!shipmentEntry) {
            return next(errorHandler(404, 'Shipment Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a shipment
export const updateShipment = async (req, res, next) => {
    const { id } = req.params;
    const { trackingNumber, status, estimatedDeliveryDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such shipment' });
    }

    try {
        const updatedShipment = await shipment.findByIdAndUpdate(id, {
            trackingNumber,
            status,
            estimatedDeliveryDate
        }, { new: true });

        if (!updatedShipment) {
            return next(errorHandler(404, 'Shipment Not Found'));
        }
        res.status(200).json(updatedShipment);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new shipment
export const createShipment = async (req, res, next) => {
    const { trackingNumber, status, estimatedDeliveryDate } = req.body;

    try {
        const newShipment = new shipment({
            trackingNumber,
            status,
            estimatedDeliveryDate
        });

        const savedShipment = await newShipment.save();
        res.status(201).json(savedShipment);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}