import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import review from "../models/review.model.js";

// Get all reviews
export const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await review.find({}).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single review by ID
export const getSingleReview = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such review' });
    }

    try {
        const reviewEntry = await review.findById(id);
        if (!reviewEntry) {
            return next(errorHandler(404, 'Review Not Found'));
        }
        res.status(200).json(reviewEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
// Delete a review
export const deleteReview = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such review' });
    }

    try {
        const reviewEntry = await review.findByIdAndDelete(id);
        if (!reviewEntry) {
            return next(errorHandler(404, 'Review Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a review
export const updateReview = async (req, res, next) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such review' });
    }

    try {
        const updatedReview = await review.findByIdAndUpdate(id, { rating, comment }, { new: true });
        if (!updatedReview) {
            return next(errorHandler(404, 'Review Not Found'));
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new review
export const createReview = async (req, res, next) => {
    const { productId, userId, rating, comment } = req.body;

    try {
        const newReview = new review({
            productId,
            userId,
            rating,
            comment
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
