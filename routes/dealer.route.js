import express from 'express';
import { getAllDealers, createDealer,deleteDealer,getDealerByEmail,getDealerByPhone,getSingleDealer,updateDealer} from '../controllers/dealer.controller.js';

const router = express.Router();
// Get all dealers
router.get('/', getAllDealers);
// Get a single dealer by ID
router.get('/:id', getSingleDealer);
// Get dealer by email
router.get('/email/:email', getDealerByEmail);
// Get dealer by phone
router.get('/phone/:phone', getDealerByPhone);
// Create a new dealer
router.post('/', createDealer);
// Delete a dealer
router.delete('/:id', deleteDealer);
// Update a dealer
router.patch('/:id', updateDealer);

export default router;