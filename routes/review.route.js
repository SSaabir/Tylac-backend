import express from 'express';
import {
createReview, deleteReview, getAllReviews, getSingleReview, updateReview
} from '../controllers/review.controller.js';

const router = express.Router();
// Get all reviews
router.get('/', getAllReviews);
// Get a single review
router.get('/:id', getSingleReview);
// Create a new review
router.post('/', createReview);
// Delete a review
router.delete('/:id', deleteReview);
// Update a review
router.patch('/:id', updateReview);
export default router;
