import express from 'express';
import {
createOffer, deleteOffer, getAllOffers, getSingleOffer, updateOffer
} from '../controllers/offer.controller.js';

const router = express.Router();
// Get all offers
router.get('/', getAllOffers);
// Get a single offer
router.get('/:id', getSingleOffer);
// Create a new offer
router.post('/', createOffer);
// Delete an offer
router.delete('/:id', deleteOffer);
// Update an offer
router.patch('/:id', updateOffer);
export default router;