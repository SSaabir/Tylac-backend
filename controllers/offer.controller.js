import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import offer from "../models/offer.model.js";

// Get all offers
export const getAllOffers = async (req, res, next) => {
    try {
        const offers = await offer.find({}).sort({ createdAt: -1 });
        res.status(200).json(offers);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single offer by ID
export const getSingleOffer = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such offer' });
    }

    try {
        const offerEntry = await offer.findById(id);
        if (!offerEntry) {
            return next(errorHandler(404, 'Offer Not Found'));
        }
        res.status(200).json(offerEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete an offer
export const deleteOffer = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such offer' });
    }

    try {
        const offerEntry = await offer.findByIdAndDelete(id);
        if (!offerEntry) {
            return next(errorHandler(404, 'Offer Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update an offer
export const updateOffer = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, discount, validUntil } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such offer' });
    }

    try {
        const updatedOffer = await offer.findByIdAndUpdate(id, { title, description, discount, validUntil }, { new: true });
        if (!updatedOffer) {
            return next(errorHandler(404, 'Offer Not Found'));
        }
        res.status(200).json(updatedOffer);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new offer
export const createOffer = async (req, res, next) => {
    const { title, description, discount, validUntil } = req.body;

    try {
        const newOffer = new offer({ title, description, discount, validUntil });
        await newOffer.save();
        res.status(201).json(newOffer);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
